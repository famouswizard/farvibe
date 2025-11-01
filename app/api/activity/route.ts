import { NextRequest, NextResponse } from 'next/server'
import { pickVibeFromTxs } from '@/lib/activity'

// GET /api/activity?address=0x...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')
  if (!address) {
    return NextResponse.json({ error: 'missing address' }, { status: 400 })
  }

  const apiKey = process.env.BASESCAN_API_KEY || ''
  // BaseScan account txlist endpoint (Etherscan-compatible)
  const qs = new URLSearchParams({
    module: 'account',
    action: 'txlist',
    address,
    sort: 'desc',
    apikey: apiKey,
  })

  let txResult: any[] = []
  try {
    const resp = await fetch(`https://api.basescan.org/api?${qs.toString()}`)
    const data = await resp.json()
    if (Array.isArray(data.result)) {
      txResult = data.result
    }
  } catch (e) {
    console.error('basescan fetch failed', e)
  }

  const vibe = pickVibeFromTxs(address, txResult)
  return NextResponse.json(vibe)
}
