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
const storyPath = process.argv.filter(a => a !== '--no-media').slice(2)[0];
if (!storyPath) {
  console.error('Usage: node server.js [--no-media] <path-to-story.md>');
  process.exit(1);
}
const resolvedStoryPath = path.resolve(storyPath);
if (!fs.existsSync(resolvedStoryPath)) {
  console.error(`File not found: ${resolvedStoryPath}`);
  process.exit(1);
}

// --- Cache directory ---
const storyHash = crypto.createHash('md5').update(resolvedStoryPath).digest('hex').slice(0, 12);
const cacheDir = path.join(__dirname, 'cache', storyHash);
fs.mkdirSync(cacheDir, { recursive: true });

// --- Migrate old audio cache files to voice-keyed names ---
(function migrateAudioCache() {
  try {
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      const match = file.match(/^audio_(\d+)\.(\w+)$/);
      if (match) {
        const [, idx, ext] = match;
        const newName = `audio_${idx}_${config.tts.defaultVoice}.${ext}`;
        const oldPath = path.join(cacheDir, file);
        const newPath = path.join(cacheDir, newName);
        if (!fs.existsSync(newPath)) {
          fs.renameSync(oldPath, newPath);
          console.log(`Migrated cache: ${file} -> ${newName}`);
        }
      }
    }
  } catch {}
})();

// --- Migrate old image cache files to model-keyed names ---
(function migrateImageCache() {
  try {
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      const match = file.match(/^image_(\d+)\.(png|jpg)$/);
      if (match) {
        const [, idx, ext] = match;
        const newName = `image_${idx}_${config.gemini.defaultImageModel}.png`;
        const oldPath = path.join(cacheDir, file);
        const newPath = path.join(cacheDir, newName);
        if (!fs.existsSync(newPath)) {
          fs.renameSync(oldPath, newPath);
          console.log(`Migrated image cache: ${file} -> ${newName}`);
        }
      }
    }
  } catch {}
})();

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

// --- Story parsing ---
function parseStory(content) {
  const lines = content.split('\n');
  let storyTitle = '';
  let storySubtitle = '';
  const chapters = [];

  // Extract h1 title
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) storyTitle = h1Match[1].trim();

  // Extract subtitle (italic line after title)
  const subtitleMatch = content.match(/^\*(.+)\*$/m);
  if (subtitleMatch) storySubtitle = subtitleMatch[1].trim();

  // Split on ## headers
  const parts = content.split(/\n(?=## )/);
  for (const part of parts) {
    const headerMatch = part.match(/^## (.+)$/m);
    if (!headerMatch) continue;

    const title = headerMatch[1].trim();
    const headerEnd = part.indexOf('\n', part.indexOf('## '));
    const rawContent = headerEnd >= 0 ? part.slice(headerEnd + 1).trim() : '';

    // Remove trailing --- separator
    const cleaned = rawContent.replace(/\n---\s*$/, '').trim();

    chapters.push({
      index: chapters.length,
      title,
      rawContent: cleaned,
      htmlContent: marked(cleaned),
    });
  }

  return { storyTitle, storySubtitle, chapters };
}

// --- Agent monologue helpers ---

function getSessionDir() {
  return path.dirname(resolvedStoryPath);
}

function buildChapterTurnMap(story) {
  const sessionDir = getSessionDir();
  const stateFile = path.join(sessionDir, 'state.json');
  const map = new Map();

  try {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    if (Array.isArray(state.events)) {
      for (const event of state.events) {
        // Pattern: "T3: Les lignes dans l'eau -- description"
        const match = event.match(/^T(\d+):\s*(.+?)(?:\s*--.*)?$/);
        if (!match) continue;
        const turnNum = parseInt(match[1], 10);
        const eventTitle = match[2].trim();

        // Find matching chapter by title
        const chapterIdx = story.chapters.findIndex(ch => ch.title === eventTitle);
        if (chapterIdx >= 0) {
          map.set(chapterIdx, turnNum);
        }
      }
    }
  } catch {}

  // Fallback: agent hook logs 0-based turn numbers, so chapter index = turn number
  for (let i = 0; i < story.chapters.length; i++) {
    if (!map.has(i)) {
      map.set(i, i);
    }
  }

  return map;
}

function parseAgentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Extract name from first line: "# Gabriel Marin -- Agent Dialogues"
  let name = path.basename(filePath, '.md');
  const headerMatch = lines[0]?.match(/^#\s+(.+?)(?:\s*--.*)?$/);
  if (headerMatch) name = headerMatch[1].trim();

  // Split on ## Turn N — label headers
  const sections = [];
  const parts = content.split(/\n(?=## Turn \d+)/);
  for (const part of parts) {
    const turnMatch = part.match(/^## Turn (\d+)\s*[—–-]\s*(.+)$/m);
    if (!turnMatch) continue;

    const turn = parseInt(turnMatch[1], 10);
    const label = turnMatch[2].trim();
    const headerEnd = part.indexOf('\n', part.indexOf('## Turn'));
    let rawContent = headerEnd >= 0 ? part.slice(headerEnd + 1).trim() : '';
    // Remove trailing --- separator
    rawContent = rawContent.replace(/\n---\s*$/, '').trim();

    sections.push({
      turn,
      label,
      rawContent,
      htmlContent: marked(rawContent),
    });
  }

  return { name, sections };
}

function getAvailableCharacters() {
  const agentsDir = path.join(getSessionDir(), 'agents');
  try {
    const files = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
    return files.map(f => {
      const slug = f.replace(/\.md$/, '');
      const filePath = path.join(agentsDir, f);
      const firstLine = fs.readFileSync(filePath, 'utf-8').split('\n')[0] || '';
      const match = firstLine.match(/^#\s+(.+?)(?:\s*--.*)?$/);
      const name = match ? match[1].trim() : slug;
      return { name, slug };
    });
  } catch {
    return [];
  }
}

// --- Current story state ---
let currentStory = parseStory(fs.readFileSync(resolvedStoryPath, 'utf-8'));
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

  // Generate all chunks sequentially and concatenate
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
    currentStory = parseStory(fs.readFileSync(resolvedStoryPath, 'utf-8'));
  } catch (err) {
    console.error('Error reading story file:', err.message);
  }
  res.json({
    storyTitle: currentStory.storyTitle,
    storySubtitle: currentStory.storySubtitle,
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

// API: list available character agents
app.get('/api/agents', (req, res) => {
  res.json({ characters: getAvailableCharacters() });
});

// API: get agent monologues for a chapter
app.get('/api/chapter/:index/agents/:slug', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const slug = req.params.slug;
  const agentFile = path.join(getSessionDir(), 'agents', `${slug}.md`);

  if (!fs.existsSync(agentFile)) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  const turnMap = buildChapterTurnMap(currentStory);
  const turnNumber = turnMap.get(index);

  if (turnNumber === undefined) {
    return res.json({ character: slug, slug, turn: null, sections: [] });
  }

  const parsed = parseAgentFile(agentFile);
  const sections = parsed.sections
    .filter(s => s.turn === turnNumber)
    .map(s => ({ label: s.label, htmlContent: s.htmlContent }));

  res.json({
    character: parsed.name,
    slug,
    turn: turnNumber,
    sections,
  });
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

// --- File polling (stat check every 2s, read only on change) ---
let lastMtimeMs = fs.statSync(resolvedStoryPath).mtimeMs;
setInterval(() => {
  if (!watchEnabled) return;
  try {
    const { mtimeMs } = fs.statSync(resolvedStoryPath);
    if (mtimeMs === lastMtimeMs) return;
    lastMtimeMs = mtimeMs;

    const content = fs.readFileSync(resolvedStoryPath, 'utf-8');
    const newStory = parseStory(content);
    const oldCount = currentStory.chapters.length;
    const newCount = newStory.chapters.length;

    if (newCount !== oldCount) {
      console.log(`Story updated: ${oldCount} -> ${newCount} chapters`);
    }
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
  } catch (err) {
    console.error('Error polling story file:', err.message);
  }
}, 2000);

// --- Start ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\nStory Reader running at http://localhost:${PORT}`);
  console.log(`Watching: ${resolvedStoryPath}`);
  console.log(`Cache: ${cacheDir}`);
  if (noMedia) console.log(`Media: DISABLED (--no-media)`);
  console.log();
});
