'use client'

import React, { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { Web3Providers } from '@/lib/wagmi'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Tell Farcaster host we're ready (hide splash screen)
  useEffect(() => {
    sdk.actions.ready().catch(() => {})
  }, [])

  return <Web3Providers>{children}</Web3Providers>
}
