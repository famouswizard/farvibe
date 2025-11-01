'use client'

import { useAccount, useConnect } from 'wagmi'

export function ConnectWallet() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()

  if (isConnected) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm flex flex-col gap-1">
        <div className="text-xs text-white/60">Connected</div>
        <div className="font-mono break-all">{address}</div>
      </div>
    )
  }

  return (
    <button
      className="bg-white text-black font-semibold rounded-2xl px-4 py-3 text-base active:scale-[.98]"
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect wallet
    </button>
  )
}
