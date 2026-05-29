// Vercel serverless proxy for Aisha Text-to-Speech.
// Forwards the JSON body to Aisha with the API key and returns its JSON
// response ({ audio_path: "https://cdn.aisha.group/..." }).

const AISHA_TTS = 'https://back.aisha.group/api/v1/tts/post/';
const FALLBACK_KEY = 'poERXvFD.jZMkpGSGL1Dtn2mRX6eEoVRrwP46tje2';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const apiKey =
      req.headers['x-api-key'] || process.env.AISHA_API_KEY || FALLBACK_KEY;

    const upstream = await fetch(AISHA_TTS, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      // req.body is already parsed JSON on Vercel; re-stringify it.
      body: JSON.stringify(req.body || {}),
    });

    const text = await upstream.text();
    res
      .status(upstream.status)
      .setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
      .send(text);
  } catch (err) {
    res.status(502).json({ error: 'TTS proxy failed: ' + err.message });
  }
}
