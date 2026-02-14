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
const API_URL = 'https://api.1min.ai/api/features';

// --- Google Cloud TTS client ---
const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, 'google-worldbuilding-key.json'),
});

// --- CLI args ---
const storyPath = process.argv[2];
if (!storyPath) {
  console.error('Usage: node server.js <path-to-story.md>');
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

// --- Current story state ---
let currentStory = parseStory(fs.readFileSync(resolvedStoryPath, 'utf-8'));
console.log(`Loaded story: "${currentStory.storyTitle}" (${currentStory.chapters.length} chapters)`);

// --- 1min.ai API helpers ---
async function callApi(body) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'API-KEY': config.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`1min.ai API error (${res.status}): ${text}`);
  }

  return res;
}

async function generateImagePrompt(chapterText) {
  const res = await callApi({
    type: 'CHAT_WITH_AI',
    model: config.llm.model,
    promptObject: {
      prompt: `${config.llm.promptPrefix}\n\nTexte du chapitre :\n${chapterText}`,
    },
  });

  const json = await res.json();
  return json.aiRecord.aiRecordDetail.resultObject[0];
}

async function generateImage(imagePrompt) {
  const res = await callApi({
    type: 'IMAGE_GENERATOR',
    model: config.image.model,
    promptObject: {
      prompt: imagePrompt,
      aspect_ratio: config.image.aspect_ratio || '16:9',
      output_quality: config.image.output_quality ?? 90,
      num_inference_steps: config.image.num_inference_steps ?? 4,
      megapixels: config.image.megapixels || '1',
      go_fast: config.image.go_fast ?? true,
    },
  });

  const json = await res.json();
  return json.aiRecord.temporaryUrl;
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

async function generateAudioChunk(text) {
  console.log(`    TTS request: voice=${config.tts.voice}, lang=${config.tts.languageCode}, encoding=${config.tts.audioEncoding}`);
  const [response] = await ttsClient.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: config.tts.languageCode,
      name: config.tts.voice,
    },
    audioConfig: {
      audioEncoding: config.tts.audioEncoding,
      speakingRate: config.tts.speakingRate,
    },
  });

  return Buffer.from(response.audioContent, 'base64');
}

async function generateAudio(text) {
  const chunks = splitTextForTTS(text);
  if (chunks.length === 1) {
    return generateAudioChunk(chunks[0]);
  }

  // Generate all chunks sequentially and concatenate
  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(`    Audio chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
    const buf = await generateAudioChunk(chunks[i]);
    buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

// --- In-flight generation tracking ---
const inFlight = new Map();

function getGenerationKey(type, index) {
  return `${type}_${index}`;
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

// API: get story structure
app.get('/api/story', (req, res) => {
  res.json({
    storyTitle: currentStory.storyTitle,
    storySubtitle: currentStory.storySubtitle,
    chapters: currentStory.chapters.map(c => ({
      index: c.index,
      title: c.title,
      htmlContent: c.htmlContent,
    })),
  });
});

// API: get chapter image
app.get('/api/chapter/:index/image', async (req, res) => {
  const index = parseInt(req.params.index, 10);
  const chapter = currentStory.chapters[index];
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

  const cachedImage = path.join(cacheDir, `image_${index}.jpg`);
  const cachedPrompt = path.join(cacheDir, `prompt_${index}.txt`);

  // Serve from cache
  if (fs.existsSync(cachedImage)) {
    return serveFile(res, cachedImage, 'image/jpeg');
  }

  // Deduplicate in-flight requests
  const key = getGenerationKey('image', index);
  if (inFlight.has(key)) {
    try {
      await inFlight.get(key);
      return serveFile(res, cachedImage, 'image/jpeg');
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const promise = (async () => {
    try {
      console.log(`Generating image for chapter ${index}...`);

      // Step 1: Generate image prompt via LLM
      const imagePrompt = await generateImagePrompt(chapter.rawContent);
      fs.writeFileSync(cachedPrompt, imagePrompt, 'utf-8');
      console.log(`  Image prompt: ${imagePrompt.slice(0, 100)}...`);

      // Step 2: Generate image
      const imageUrl = await generateImage(imagePrompt);
      console.log(`  Image URL received, downloading...`);

      // Step 3: Download and cache the image
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`);
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(cachedImage, imgBuffer);
      console.log(`  Image cached for chapter ${index}`);
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  try {
    await promise;
    serveFile(res, cachedImage, 'image/jpeg');
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
  const index = parseInt(req.params.index, 10);
  const chapter = currentStory.chapters[index];
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' });

  const cachedAudio = path.join(cacheDir, `audio_${index}.${audioFmt.ext}`);

  // Serve from cache
  if (fs.existsSync(cachedAudio)) {
    return serveFile(res, cachedAudio, audioFmt.mime);
  }

  // Deduplicate in-flight requests
  const key = getGenerationKey('audio', index);
  if (inFlight.has(key)) {
    try {
      await inFlight.get(key);
      return serveFile(res, cachedAudio, audioFmt.mime);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const promise = (async () => {
    try {
      console.log(`Generating audio for chapter ${index}...`);
      const plainText = stripMarkdown(chapter.rawContent);
      const audioBuffer = await generateAudio(plainText);
      fs.writeFileSync(cachedAudio, audioBuffer);
      console.log(`  Audio cached for chapter ${index}`);
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);

  try {
    await promise;
    serveFile(res, cachedAudio, audioFmt.mime);
  } catch (err) {
    console.error(`Audio generation failed for chapter ${index}:`, err.message);
    res.status(500).json({ error: `Audio generation failed: ${err.message}` });
  }
});

// --- File watcher ---
let watchDebounce = null;
fs.watch(resolvedStoryPath, (eventType) => {
  if (eventType !== 'change') return;
  clearTimeout(watchDebounce);
  watchDebounce = setTimeout(() => {
    try {
      const content = fs.readFileSync(resolvedStoryPath, 'utf-8');
      const newStory = parseStory(content);
      const oldCount = currentStory.chapters.length;
      const newCount = newStory.chapters.length;

      if (newCount !== oldCount) {
        console.log(`Story updated: ${oldCount} -> ${newCount} chapters`);
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
      } else {
        // Content might have changed even if count is the same
        currentStory = newStory;
      }
    } catch (err) {
      console.error('Error re-reading story:', err.message);
    }
  }, 500);
});

// --- Start ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\nStory Reader running at http://localhost:${PORT}`);
  console.log(`Watching: ${resolvedStoryPath}`);
  console.log(`Cache: ${cacheDir}\n`);
});
