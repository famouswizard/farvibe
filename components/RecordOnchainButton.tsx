'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { FARVIBE_REGISTRY_ADDRESS, FARVIBE_REGISTRY_ABI } from '@/lib/contract'

type Props = {
  vibeCategory: string
  song: string
  youtubeUrl: string
}

export function RecordOnchainButton({ vibeCategory, song, youtubeUrl }: Props) {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)
  const { writeContractAsync, isPending } = useWriteContract()
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  })

  async function handleRecord() {
    try {
      const hash = await writeContractAsync({
        address: FARVIBE_REGISTRY_ADDRESS,
        abi: FARVIBE_REGISTRY_ABI,
        functionName: 'recordVibe',
        args: [vibeCategory, song, youtubeUrl],
        chainId: 8453,
      })
      setTxHash(hash)
    } catch (err) {
      console.error(err)
    }
  }

  const confirmed = Boolean(receipt)

  return (
    <button
      disabled={isPending}
      onClick={handleRecord}
      className="bg-[#0052FF] text-white font-semibold rounded-2xl px-4 py-3 text-base w-full active:scale-[.98] disabled:opacity-50"
    >
      {confirmed
        ? '✅ Recorded onchain'
        : isPending
        ? 'Confirm in wallet…'
        : 'Record onchain'}
    </button>
  )
}
