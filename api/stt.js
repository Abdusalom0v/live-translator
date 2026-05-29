// Vercel serverless proxy for Aisha Speech-to-Text.
// The browser can't call back.aisha.group directly (no CORS headers), so it
// posts the recorded audio here and we forward it server-side, attaching the
// API key. Returns Aisha's JSON ({ transcript, ... }) untouched.

export const config = { api: { bodyParser: false } };

const AISHA_STT = 'https://back.aisha.group/api/v1/stt/post/';
// Fallback key (already shipped in the client). Override with the AISHA_API_KEY
// environment variable in the Vercel project settings.
const FALLBACK_KEY = 'poERXvFD.jZMkpGSGL1Dtn2mRX6eEoVRrwP46tje2';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    const apiKey =
      req.headers['x-api-key'] || process.env.AISHA_API_KEY || FALLBACK_KEY;

    const upstream = await fetch(AISHA_STT, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        // Preserve the multipart boundary from the original request.
        'Content-Type': req.headers['content-type'],
      },
      body,
    });

    const text = await upstream.text();
    res
      .status(upstream.status)
      .setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
      .send(text);
  } catch (err) {
    res.status(502).json({ error: 'STT proxy failed: ' + err.message });
  }
}
