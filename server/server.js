const express = require('express');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const http = require('http');
const { WebSocketServer } = require('ws');
const textToSpeech = require('@google-cloud/text-to-speech');

// --- Config ---
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const secrets = JSON.parse(fs.readFileSync(path.join(__dirname, 'secrets.json'), 'utf-8'));

// --- Google Cloud TTS client ---
const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, secrets.googleCloudKeyFile),
});

// --- TTS usage tracking (free tier: 4M chars/month for Standard voices) ---
const FREE_TIER_LIMIT = 4_000_000;
const usagePath = path.join(__dirname, 'tts-usage.json');

function loadUsage() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  try {
    const data = JSON.parse(fs.readFileSync(usagePath, 'utf-8'));
    if (data.month === currentMonth) return data;
  } catch {}
  return { month: currentMonth, chars: 0 };
}

function saveUsage(usage) {
  fs.writeFileSync(usagePath, JSON.stringify(usage, null, 2), 'utf-8');
}

// --- CLI args ---
let noMedia = process.argv.includes('--no-media');
let watchEnabled = true;
let currentVoice = config.tts.defaultVoice;
let currentImageModel = config.gemini.defaultImageModel;
const sessionArg = process.argv.filter(a => a !== '--no-media').slice(2)[0];
if (!sessionArg) {
  console.error('Usage: node server.js [--no-media] <session-directory>');
  process.exit(1);
}
const sessionDir = path.resolve(sessionArg);
const turnsDir = path.join(sessionDir, 'turns');
if (!fs.existsSync(turnsDir)) {
  console.error(`Not a valid session directory (no turns/ found): ${sessionDir}`);
  process.exit(1);
}

// --- Cache directory ---
const storyHash = crypto.createHash('md5').update(sessionDir).digest('hex').slice(0, 12);
const cacheDir = path.join(__dirname, 'cache', storyHash);
fs.mkdirSync(cacheDir, { recursive: true });

// --- Markdown stripping for TTS ---
function stripMarkdown(md) {
  return md
    .replace(/^#{1,6}\s+.*$/gm, '')       // headers
    .replace(/\*\*(.+?)\*\*/g, '$1')       // bold
    .replace(/\*(.+?)\*/g, '$1')           // italic
    .replace(/_(.+?)_/g, '$1')             // italic alt
    .replace(/~~(.+?)~~/g, '$1')           // strikethrough
    .replace(/`(.+?)`/g, '$1')             // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')    // links
    .replace(/!\[.*?\]\(.+?\)/g, '')       // images
    .replace(/^[-*+]\s+/gm, '')            // unordered lists
    .replace(/^\d+\.\s+/gm, '')            // ordered lists
    .replace(/^>\s+/gm, '')                // blockquotes
    .replace(/^---+$/gm, '')               // horizontal rules
    .replace(/\n{3,}/g, '\n\n')            // collapse multiple newlines
    .trim();
}

// --- Voice helpers ---
function voiceLabel(voiceName) {
  return voiceName.replace(/^[a-z]{2}-[A-Z]{2}-/, '');
}

function getCachedVoicesForChapter(index) {
  const prefix = `audio_${index}_`;
  const suffix = `.${audioFmt.ext}`;
  try {
    return fs.readdirSync(cacheDir)
      .filter(f => f.startsWith(prefix) && f.endsWith(suffix))
      .map(f => f.slice(prefix.length, -suffix.length));
  } catch { return []; }
}

// --- Image model helpers ---
function imageModelLabel(name) {
  if (name.includes('-fast-')) return 'Fast';
  if (name.includes('-ultra-')) return 'Ultra';
  return 'Standard';
}

function getCachedImageModelsForChapter(index) {
  const prefix = `image_${index}_`;
  const suffix = '.png';
  try {
    return fs.readdirSync(cacheDir)
      .filter(f => f.startsWith(prefix) && f.endsWith(suffix))
      .map(f => f.slice(prefix.length, -suffix.length));
  } catch { return []; }
}

// --- Story title resolution ---
// Try to read from the seed file: output/{world}/{seed}/ -> worlds/{world}/seeds/{seed}.md
function resolveStoryTitle() {
  const seedName = path.basename(sessionDir);           // e.g. 20260227-la-marge-d-erreur
  const worldName = path.basename(path.dirname(sessionDir)); // e.g. metro
  const projectRoot = path.dirname(path.dirname(path.dirname(sessionDir)));
  const seedFile = path.join(projectRoot, 'worlds', worldName, 'seeds', `${seedName}.md`);

  try {
    const content = fs.readFileSync(seedFile, 'utf-8');
    // "# STORY SEED: La Marge d'Erreur" or "**Title:** La Marge d'Erreur"
    const titleMatch = content.match(/^\*\*Title:\*\*\s*(.+)$/m);
    if (titleMatch) return titleMatch[1].trim();
    const h1Match = content.match(/^#\s+(?:STORY SEED:\s*)?(.+)$/m);
    if (h1Match) return h1Match[1].trim();
  } catch {}

  // Fallback: derive from directory name (strip date prefix, un-kebab)
  const slug = seedName.replace(/^\d{8}-/, '');
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// --- Story loading from turns/ ---
function loadStory() {
  const storyTitle = resolveStoryTitle();
  const chapters = [];

  // Read turn directories, sorted numerically
  let turnDirs;
  try {
    turnDirs = fs.readdirSync(turnsDir)
      .filter(d => /^\d+$/.test(d) && fs.existsSync(path.join(turnsDir, d, 'chapter.md')))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  } catch {
    turnDirs = [];
  }

  for (const turnDir of turnDirs) {
    const chapterFile = path.join(turnsDir, turnDir, 'chapter.md');
    const content = fs.readFileSync(chapterFile, 'utf-8');

    // Each chapter.md starts with "## Title" followed by content
    const headerMatch = content.match(/^## (.+)$/m);
    const chapterTitle = headerMatch ? headerMatch[1].trim() : `Chapter ${turnDir}`;

    // Content is everything after the ## header line
    const headerEnd = content.indexOf('\n', content.indexOf('## '));
    const rawContent = headerEnd >= 0 ? content.slice(headerEnd + 1).trim() : '';

    chapters.push({
      index: chapters.length,
      turn: parseInt(turnDir, 10),
      title: chapterTitle,
      rawContent,
      htmlContent: marked(rawContent),
    });
  }

  return { storyTitle, chapters };
}

// --- Agent helpers for new turns-based format ---

// Parse a single agent file from turns/NN/agents/NN-slug.md
// Extracts character name and the ## Response section
function parseAgentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Name from "# Character Name"
  let name = path.basename(filePath, '.md').replace(/^\d+-/, '');
  const headerMatch = content.match(/^#\s+(.+)$/m);
  if (headerMatch) name = headerMatch[1].trim();

  // Extract everything after "## Response"
  const responseIdx = content.indexOf('\n## Response');
  let response = '';
  if (responseIdx >= 0) {
    const afterHeader = content.indexOf('\n', responseIdx + 1);
    response = afterHeader >= 0 ? content.slice(afterHeader + 1).trim() : '';
  }

  return { name, response, htmlResponse: response ? marked(response) : '' };
}

// Get all agents for a given turn number
function getAgentsForTurn(turnNum) {
  const turnStr = String(turnNum).padStart(2, '0');
  const agentsDir = path.join(turnsDir, turnStr, 'agents');
  try {
    const files = fs.readdirSync(agentsDir)
      .filter(f => f.endsWith('.md'))
      .sort();
    return files.map(f => {
      const parsed = parseAgentFile(path.join(agentsDir, f));
      return { name: parsed.name, htmlContent: parsed.htmlResponse };
    });
  } catch {
    return [];
  }
}

// --- Current story state ---
let currentStory = loadStory();
console.log(`Loaded story: "${currentStory.storyTitle}" (${currentStory.chapters.length} chapters)`);

// --- Image generation (Gemini Flash prompt + Imagen 4) ---
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function generateImagePrompt(chapterText) {
  const { promptModel, imagePrompt } = config.gemini;
  const apiKey = secrets.geminiApiKey;
  const url = `${GEMINI_API_BASE}/${promptModel}:generateContent`;

  const body = {
    contents: [{ parts: [{ text: chapterText }] }],
    systemInstruction: { parts: [{ text: imagePrompt }] },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini prompt API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no prompt text');
  return text.trim();
}

async function generateImageWithImagen(prompt, model) {
  const { aspectRatio, imageSize } = config.gemini;
  const apiKey = secrets.geminiApiKey;
  const url = `${GEMINI_API_BASE}/${model}:predict`;

  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: aspectRatio || '1:1',
    },
  };
  if (imageSize) body.parameters.imageSize = imageSize;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Imagen API error (${res.status}): ${text}`);
  }

  const json = await res.json();
  const prediction = json.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) {
    throw new Error('Imagen returned no image data');
  }

  return {
    imageBuffer: Buffer.from(prediction.bytesBase64Encoded, 'base64'),
    mimeType: prediction.mimeType || 'image/png',
  };
}

// Split text into chunks of max ~4000 chars, breaking at paragraph boundaries
function splitTextForTTS(text, maxLen = 4000) {
  if (text.length <= maxLen) return [text];

  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = '';

  for (const para of paragraphs) {
    if (current.length + para.length + 2 > maxLen && current.length > 0) {
      chunks.push(current.trim());
      current = '';
    }
    current += (current ? '\n\n' : '') + para;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function generateAudioChunk(text, voice) {
  const usage = loadUsage();
  if (usage.chars + text.length > FREE_TIER_LIMIT) {
    throw new Error(`TTS free tier limit reached (${usage.chars.toLocaleString()}/${FREE_TIER_LIMIT.toLocaleString()} chars). Resets next month.`);
  }

  console.log(`    TTS request: voice=${voice}, lang=${config.tts.languageCode}, encoding=${config.tts.audioEncoding} (usage: ${usage.chars.toLocaleString()}+${text.length} chars)`);
  const [response] = await ttsClient.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: config.tts.languageCode,
      name: voice,
    },
    audioConfig: {
      audioEncoding: config.tts.audioEncoding,
      speakingRate: config.tts.speakingRate,
    },
  });

  usage.chars += text.length;
  saveUsage(usage);

  return Buffer.from(response.audioContent, 'base64');
}

async function generateAudio(text, voice) {
  const chunks = splitTextForTTS(text);
  if (chunks.length === 1) {
    return generateAudioChunk(chunks[0], voice);
  }

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(`    Audio chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
    const buf = await generateAudioChunk(chunks[i], voice);
    buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

// --- In-flight generation tracking ---
const inFlight = new Map();

function getGenerationKey(type, index, voice) {
  return voice ? `${type}_${index}_${voice}` : `${type}_${index}`;
}

// --- File serving helper (Express 5 sendFile can be finicky) ---
function serveFile(res, filePath, contentType) {
  const data = fs.readFileSync(filePath);
  res.set('Content-Type', contentType);
  res.send(data);
}

// --- Express app ---
const app = express();
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });
const wsClients = new Set();

wss.on('connection', (ws) => {
  wsClients.add(ws);
  ws.on('close', () => wsClients.delete(ws));
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of wsClients) {
    if (ws.readyState === 1) ws.send(msg);
  }
}

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API: get story structure (always re-read from disk to avoid stale state)
app.get('/api/story', (req, res) => {
  try {
    currentStory = loadStory();
  } catch (err) {
    console.error('Error reading story:', err.message);
  }
  res.json({
    storyTitle: currentStory.storyTitle,
    mediaEnabled: !noMedia,
    watchEnabled,
    voices: config.tts.voices.map(v => ({ id: v, label: voiceLabel(v) })),
    currentVoice,
    imageModels: config.gemini.imageModels.map(m => ({ id: m, label: imageModelLabel(m) })),
    currentImageModel,
    chapters: currentStory.chapters.map(c => ({
      index: c.index,
      title: c.title,
      htmlContent: c.htmlContent,
    })),
  });
});

// API: toggle media
app.post('/api/media-enabled', express.json(), (req, res) => {
  noMedia = !req.body.enabled;
  res.json({ mediaEnabled: !noMedia });
});

// API: toggle file watching
app.post('/api/watch-enabled', express.json(), (req, res) => {
  watchEnabled = !!req.body.enabled;
  console.log(`File watching: ${watchEnabled ? 'ON' : 'OFF'}`);
  res.json({ watchEnabled });
});

// API: change image model
app.post('/api/image-model', express.json(), (req, res) => {
  const model = req.body.model;
  if (!config.gemini.imageModels.includes(model)) {
    return res.status(400).json({ error: 'Unknown image model' });
  }
  currentImageModel = model;
  res.json({ currentImageModel });
});

// API: change voice
app.post('/api/voice', express.json(), (req, res) => {
  const voice = req.body.voice;
  if (!config.tts.voices.includes(voice)) {
    return res.status(400).json({ error: 'Unknown voice' });
  }
  currentVoice = voice;
  res.json({ currentVoice });
});

// API: get all agents for a chapter (coulisses)
app.get('/api/chapter/:index/agents', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const chapter = currentStory.chapters[index];
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

  const agents = getAgentsForTurn(chapter.turn);
  res.json({ turn: chapter.turn, agents });
});

// API: get chapter image
app.get('/api/chapter/:index/image', async (req, res) => {
  if (noMedia) return res.status(404).json({ error: 'Media generation disabled (--no-media)' });
  const index = parseInt(req.params.index, 10);
  const chapter = currentStory.chapters[index];
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

  const model = req.query.model || currentImageModel;
  if (!config.gemini.imageModels.includes(model)) {
    return res.status(400).json({ error: 'Unknown image model' });
  }

  const cachedImage = path.join(cacheDir, `image_${index}_${model}.png`);
  const cachedPrompt = path.join(cacheDir, `prompt_${index}.txt`);

  function serveCached() {
    const cachedModels = getCachedImageModelsForChapter(index);
    res.set('X-Cached-Models', JSON.stringify(cachedModels));
    serveFile(res, cachedImage, 'image/png');
  }

  // Serve from cache
  if (fs.existsSync(cachedImage)) {
    return serveCached();
  }

  // Deduplicate in-flight requests
  const key = getGenerationKey('image', index, model);
  if (inFlight.has(key)) {
    try {
      await inFlight.get(key);
      return serveCached();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const promise = (async () => {
    try {
      // Step 1: generate English prompt from chapter text (reuse cached prompt if available)
      let prompt;
      if (fs.existsSync(cachedPrompt)) {
        prompt = fs.readFileSync(cachedPrompt, 'utf-8');
        console.log(`Reusing cached prompt for chapter ${index}`);
      } else {
        console.log(`Generating image prompt for chapter ${index} via ${config.gemini.promptModel}...`);
        prompt = await generateImagePrompt(chapter.rawContent);
        fs.writeFileSync(cachedPrompt, prompt, 'utf-8');
        console.log(`  Prompt: ${prompt.slice(0, 120)}...`);
      }

      // Step 2: generate image from prompt
      console.log(`Generating image for chapter ${index} via ${model}...`);
      const result = await generateImageWithImagen(prompt, model);
      fs.writeFileSync(cachedImage, result.imageBuffer);
      console.log(`  Image cached for chapter ${index} (${imageModelLabel(model)})`);
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  try {
    await promise;
    serveCached();
  } catch (err) {
    console.error(`Image generation failed for chapter ${index}:`, err.message);
    res.status(500).json({ error: `Image generation failed: ${err.message}` });
  }
});

// --- Audio format helpers ---
const AUDIO_FORMATS = {
  MP3:        { ext: 'mp3',  mime: 'audio/mpeg' },
  LINEAR16:   { ext: 'wav',  mime: 'audio/wav' },
  OGG_OPUS:   { ext: 'opus', mime: 'audio/opus' },
};
const audioFmt = AUDIO_FORMATS[config.tts.audioEncoding] || AUDIO_FORMATS.MP3;

// API: get chapter audio
app.get('/api/chapter/:index/audio', async (req, res) => {
  if (noMedia) return res.status(404).json({ error: 'Media generation disabled (--no-media)' });
  const index = parseInt(req.params.index, 10);
  const chapter = currentStory.chapters[index];
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

  const voice = req.query.voice || currentVoice;
  if (!config.tts.voices.includes(voice)) {
    return res.status(400).json({ error: 'Unknown voice' });
  }

  const cachedAudio = path.join(cacheDir, `audio_${index}_${voice}.${audioFmt.ext}`);

  function serveCached() {
    const cachedVoices = getCachedVoicesForChapter(index);
    res.set('X-Cached-Voices', JSON.stringify(cachedVoices));
    serveFile(res, cachedAudio, audioFmt.mime);
  }

  // Serve from cache
  if (fs.existsSync(cachedAudio)) {
    return serveCached();
  }

  // Deduplicate in-flight requests
  const key = getGenerationKey('audio', index, voice);
  if (inFlight.has(key)) {
    try {
      await inFlight.get(key);
      return serveCached();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const promise = (async () => {
    try {
      console.log(`Generating audio for chapter ${index} (voice: ${voice})...`);
      const plainText = stripMarkdown(chapter.rawContent);
      const audioBuffer = await generateAudio(plainText, voice);
      fs.writeFileSync(cachedAudio, audioBuffer);
      console.log(`  Audio cached for chapter ${index} (voice: ${voice})`);
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  try {
    await promise;
    serveCached();
  } catch (err) {
    console.error(`Audio generation failed for chapter ${index}:`, err.message);
    res.status(500).json({ error: `Audio generation failed: ${err.message}` });
  }
});

// --- File polling (watch turns/ for new chapter files, check every 2s) ---
let lastChapterCount = currentStory.chapters.length;
setInterval(() => {
  if (!watchEnabled) return;
  try {
    // Quick directory count check before expensive full parse
    const turnCount = fs.readdirSync(turnsDir)
      .filter(d => /^\d+$/.test(d) && fs.existsSync(path.join(turnsDir, d, 'chapter.md')))
      .length;
    if (turnCount === lastChapterCount) return;

    const newStory = loadStory();
    const newCount = newStory.chapters.length;

    if (newCount !== lastChapterCount) {
      console.log(`Story updated: ${lastChapterCount} -> ${newCount} chapters`);
      lastChapterCount = newCount;
      currentStory = newStory;
      broadcast({
        type: 'story-updated',
        chapterCount: newCount,
        chapters: newStory.chapters.map(c => ({
          index: c.index,
          title: c.title,
          htmlContent: c.htmlContent,
        })),
      });
    }
  } catch (err) {
    console.error('Error polling story:', err.message);
  }
}, 2000);

// --- Start ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\nStory Reader running at http://localhost:${PORT}`);
  console.log(`Session: ${sessionDir}`);
  console.log(`Cache: ${cacheDir}`);
  if (noMedia) console.log(`Media: DISABLED (--no-media)`);
  console.log();
});
