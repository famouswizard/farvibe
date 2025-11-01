export const FARVIBE_REGISTRY_ADDRESS =
  '0x5468855566d73db838150a45fae58c06d1275c66' as const

export const FARVIBE_REGISTRY_ABI = [
  {
    type: 'function',
    name: 'recordVibe',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'vibeCategory', type: 'string' },
      { name: 'songTitle', type: 'string' },
      { name: 'youtubeUrl', type: 'string' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getVibe',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      {
        components: [
          { name: 'vibeCategory', type: 'string' },
          { name: 'songTitle', type: 'string' },
          { name: 'youtubeUrl', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
        ],
        type: 'tuple',
      },
    ],
  },
] as const
