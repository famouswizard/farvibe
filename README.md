# 🎧 FarVibe

Farcaster Miniapp on Base

FarVibe analyzes your onchain activity on Base, assigns you a "vibe",
picks a song + YouTube link for that vibe, lets you record it onchain,
and lets you cast it to Farcaster.

## Stack

- Next.js (App Router)
- TypeScript
- @farcaster/miniapp-sdk
- @farcaster/miniapp-wagmi-connector
- wagmi + viem
- Base Mainnet

## Smart contract

We write your vibe to:
`0x5468855566d73db838150a45fae58c06d1275c66` (Base mainnet).

Function:
```solidity
function recordVibe(string vibeCategory, string songTitle, string youtubeUrl)
```

## Env vars

Set these in Netlify (Site settings → Environment variables):

```bash
NEXT_PUBLIC_BASE_URL=https://farvibe.netlify.app
NEXT_PUBLIC_FARVIBE_REGISTRY_ADDRESS=0x5468855566d73db838150a45fae58c06d1275c66
BASESCAN_API_KEY=G5VXR92PWES8DK9CIJ38BD7MPCZ56ZMCPT
```

## Deploy flow (GitHub → Netlify)

1. Push this repo to GitHub.
2. In Netlify: Add new site → Import from Git.
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env vars above.
6. Deploy.

## Farcaster miniapp checklist

- `public/.well-known/farcaster.json` is served on the production domain.
- The app calls `sdk.actions.ready()` (inside `components/Providers.tsx`) to hide splash.
- We use `@farcaster/miniapp-wagmi-connector` so the embedded Farcaster wallet
  is the signer (no wallet modal).
- We use `sdk.actions.composeCast` to open Farcaster's native cast composer.
- `/share/[address]` exposes `<meta name="fc:miniapp" ...>` so casts with that URL
  render as an interactive miniapp card with a "launch miniapp" button.

## Images

- `public/app-icon.png` — 1024x1024 PNG, no alpha (placeholder here)
- `public/splash.png` — 200x200 splash graphic (placeholder here)
- `public/share-default.png` — 3:2 preview image for sharing (placeholder here).
### 🩵 Recent Activity

- Heartbeat at Tue Nov 25 04:06:20 UTC 2025 — 19216
- Heartbeat at Tue Nov 25 01:46:20 UTC 2025 — 16372
- Heartbeat at Mon Nov 24 23:01:37 UTC 2025 — 8077
- Heartbeat at Mon Nov 24 22:27:34 UTC 2025 — 20409
- Heartbeat at Mon Nov 24 21:57:03 UTC 2025 — 12689

