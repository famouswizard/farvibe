import { SONGS } from './songs'
import { randomFromArray } from './utils'

type Tx = {
  timeStamp: string
  value: string // wei as string
  from: string
  to: string
}

export function pickVibeFromTxs(
  address: string,
  txs: Tx[]
): {
  address: string
  vibeCategory: string
  song: string
  youtubeUrl: string
  txCount30d: number
  volumeEth30d: number
} {
  const nowSec = Date.now() / 1000
  const cutoffSec = nowSec - 30 * 24 * 60 * 60 // last 30 days

  // recent activity (30d)
  const recent = txs.filter((tx) => Number(tx.timeStamp) >= cutoffSec)

  const txCount30d = recent.length

  let volumeEth30d = 0
  for (const tx of recent) {
    const eth = Number(tx.value) / 1e18
    volumeEth30d += eth
  }

  let vibeCategory = 'normie'
  if (txCount30d > 50) {
    vibeCategory = 'degen'
  } else if (volumeEth30d > 3) {
    vibeCategory = 'whale'
  }

  const pool = SONGS[vibeCategory] ?? SONGS['normie']
  const pick = randomFromArray(pool)

  return {
    address,
    vibeCategory,
    song: pick.title,
    youtubeUrl: pick.youtubeUrl,
    txCount30d,
    volumeEth30d,
  }
}
