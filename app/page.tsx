'use client'

import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectWallet } from '@/components/ConnectWallet'
import { VibeResult } from '@/components/VibeResult'
import { RecordOnchainButton } from '@/components/RecordOnchainButton'

type VibeResponse = {
  address: string
  vibeCategory: string
  song: string
  youtubeUrl: string
  txCount30d: number
  volumeEth30d: number
}

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const [vibe, setVibe] = useState<VibeResponse | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      if (!address) return
      setLoading(true)
      try {
        const res = await fetch(`/api/activity?address=${address}`)
        const json = await res.json()
        setVibe(json)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [address])

  return (
    <main className="min-h-dvh flex flex-col p-4 gap-4 bg-gradient-to-b from-[#1a1a1d] to-[#0f0f10]">
      <header className="flex items-start justify-between">
        <div className="text-lg font-semibold text-white">FarVibe</div>
        <div className="text-xs text-white/40">Base only</div>
      </header>

      <ConnectWallet />

      {isConnected && (
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="text-white/60 text-sm">
              Scanning your Base activity, picking your vibe…
            </div>
          )}

          {vibe && (
            <>
              <VibeResult
                vibeCategory={vibe.vibeCategory}
                song={vibe.song}
                youtubeUrl={vibe.youtubeUrl}
                address={vibe.address}
              />

              <RecordOnchainButton
                vibeCategory={vibe.vibeCategory}
                song={vibe.song}
                youtubeUrl={vibe.youtubeUrl}
              />

              <div className="text-[11px] text-white/40 leading-snug">
                Tx last 30d: {vibe.txCount30d} • Volume:{' '}
                {vibe.volumeEth30d.toFixed(4)} ETH
              </div>
            </>
          )}
        </div>
      )}

      {!isConnected && (
        <div className="text-white/60 text-xs">
          Connect wallet (your embedded Farcaster/Base wallet will auto-connect)
          and I&apos;ll tell you your vibe.
        </div>
      )}

      <footer className="mt-auto text-[10px] text-white/30 text-center">
        FarVibe • on Base • v0.1
      </footer>
    </main>
  )
}
