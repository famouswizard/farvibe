"use client"

import React, { useState } from "react"
import { useAccount, useWriteContract } from "wagmi"
import { base } from "viem/chains"
import { Button } from "@/components/ui/button"

const FARVIBE_REGISTRY_ADDRESS =
  (process.env.NEXT_PUBLIC_FARVIBE_REGISTRY_ADDRESS as `0x${string}`) ??
  "0x5468855566d73db838150a45fae58c06d1275c66"

const FARVIBE_REGISTRY_ABI = [
  {
    type: "function",
    name: "recordVibe",
    stateMutability: "nonpayable",
    inputs: [
      { name: "vibeCategory", type: "string" },
      { name: "track", type: "string" },
      { name: "youtubeUrl", type: "string" },
    ],
    outputs: [],
  },
] as const

export function RecordOnchainButton({
  category,
  track,
  url,
}: {
  category: string
  track: string
  url: string
}) {
  const { address: account } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  async function handleRecord() {
    if (!account) {
      alert("Connect your wallet first")
      return
    }

    try {
      setIsLoading(true)

      const hash = await writeContractAsync({
        address: FARVIBE_REGISTRY_ADDRESS,
        abi: FARVIBE_REGISTRY_ABI,
        functionName: "recordVibe",
        args: [category, track, url],
        chain: base,
        account,
      })

      setTxHash(hash)
      console.log("✅ Vibe recorded:", hash)
    } catch (err) {
      console.error("❌ Error recording vibe:", err)
      alert("Transaction failed. Check console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        onClick={handleRecord}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2"
      >
        {isLoading ? "Recording..." : "Record onchain"}
      </Button>

      {txHash && (
        <a
          href={`https://basescan.org/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition"
        >
          View on Basescan ↗
        </a>
      )}
    </div>
  )
}
