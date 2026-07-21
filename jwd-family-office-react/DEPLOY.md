# Deploy — JWD Family Office

Vite + React SPA with a Vercel Edge Function for the AI advisor.

## Vercel
1. Import the repo → framework auto-detects **Vite** (build `vite build`, output `dist`).
2. The `api/advisor.js` edge function is picked up automatically → `/api/advisor`.
3. Add env var **`GROQ_API_KEY`** (Settings → Environment Variables) → Redeploy.

## Plug in videos
Edit `src/videos.jsx` → `VIDEO_SOURCES`: paste each HeyGen/YouTube/mp4 URL
against its key (`hero-1`, `edu-01`…`edu-05`, `exp-*`). Empty = "coming soon".

## Group-site links
Update the ecosystem/portal `href`s in `src/components/Proof.jsx` (Ecosystem)
and `src/components/Hero.jsx` (portal buttons) with the live Investment /
ANAWAK / Luna Travel URLs.
