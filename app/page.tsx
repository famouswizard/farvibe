"use client"

import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { ConnectWallet } from "@/components/ConnectWallet"
import { VibeResult } from "@/components/VibeResult"
import { RecordOnchainButton } from "@/components/RecordOnchainButton"

interface VibeData {
  vibeCategory: string
  song: string
  youtubeUrl: string
}

export default function HomePage() {
  const { address } = useAccount()
  const [vibe, setVibe] = useState<VibeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchVibe() {
    if (!address) {
      setError("Connect wallet to get your FarVibe.")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/activity?address=${address}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setVibe(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to fetch vibe data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (address) fetchVibe()
  }, [address])

  return (
    <main className="min-h-dvh bg-[#0f0f10] text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-400">FarVibe</h1>

      {!address && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/70">Connect your Farcaster wallet to get started.</p>
          <ConnectWallet />
        </div>
      )}

      {address && !vibe && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={fetchVibe}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze my vibe"}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      )}

      {vibe && (
        <div className="flex flex-col items-center gap-6">
          <VibeResult vibe={vibe} />

          <RecordOnchainButton
            category={vibe.vibeCategory}
            track={vibe.song}
            url={vibe.youtubeUrl}
          />
        </div>
      )}
    </main>
  )
}
