'use client'

import { http, createConfig } from 'wagmi'
import { base } from 'viem/chains'
import { injected } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(),
  },
})
