"use client"

import React from "react"

interface VibeData {
  vibeCategory: string
  song: string
  youtubeUrl: string
}

interface Props {
  vibe: VibeData
}

export function VibeResult({ vibe }: Props) {
  return (
    <div className="flex flex-col items-center text-center bg-[#1a1a1c] p-6 rounded-2xl shadow-lg max-w-md">
      <h2 className="text-2xl font-semibold text-blue-400 mb-2">
        Your vibe: {vibe.vibeCategory}
      </h2>
      <p className="text-white/90 mb-4">🎵 {vibe.song}</p>
      <a
        href={vibe.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-300 transition"
      >
        Watch on YouTube ↗
      </a>
    </div>
  )
}
