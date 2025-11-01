'use client'

import { sdk } from '@farcaster/miniapp-sdk'

type Props = {
  vibeCategory: string
  song: string
  youtubeUrl: string
  address: string
}

export function VibeResult({ vibeCategory, song, youtubeUrl, address }: Props) {
  async function handleCast() {
    const text = `My onchain vibe on Base: ${vibeCategory.toUpperCase()} 🎧 ${song} — ${youtubeUrl}\n\nCheck yours in FarVibe 👇`
    const embeds = [
      `https://farvibe.netlify.app/share/${address}`,
    ]
    try {
      await sdk.actions.composeCast({
        text,
        embeds,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="flex flex-col">
        <div className="text-xs text-white/60 uppercase tracking-wide">
          YOUR VIBE
        </div>
        <div className="text-2xl font-semibold text-white">{vibeCategory}</div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs text-white/60 uppercase tracking-wide">
          YOUR TRACK
        </div>
        <a
          className="text-lg font-medium text-[#0052FF] underline break-words"
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {song}
        </a>
      </div>

      <button
        onClick={handleCast}
        className="bg-white text-black font-semibold rounded-2xl px-4 py-3 text-base w-full active:scale-[.98]"
      >
        Cast my vibe
      </button>
    </div>
  )
}
