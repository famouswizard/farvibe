'use client'

import React from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    sdk.actions.ready()
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
