import React from 'react'
import Image from 'next/image'
import shareImage from '@/public/share-default.png'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://farvibe.netlify.app'

function buildMiniAppEmbed(address: string) {
  return {
    version: '1',
    imageUrl: `${BASE_URL}/share-default.png`,
    button: {
      title: 'Check my FarVibe',
      action: {
        type: 'launch_miniapp',
        url: `${BASE_URL}?address=${address}`,
        name: 'FarVibe',
        splashImageUrl: `${BASE_URL}/splash.png`,
        splashBackgroundColor: '#0f0f10',
      },
    },
  }
}

export default async function SharePage({
  params,
}: {
  params: { address: string }
}) {
  const { address } = params
  const embed = buildMiniAppEmbed(address)
  const embedStr = JSON.stringify(embed)

  const title = `FarVibe | ${address.slice(0, 6)}…${address.slice(-4)}`

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="fc:miniapp" content={embedStr} />
        {/* Fallback / backward-compat hint; not all clients may require it */}
        <meta
          name="fc:frame"
          content={embedStr.replace('launch_miniapp', 'launch_frame')}
        />
        <meta property="og:title" content="FarVibe on Base" />
        <meta
          property="og:description"
          content="My onchain vibe + track. Open FarVibe in Farcaster."
        />
        <meta property="og:image" content={`${BASE_URL}/share-default.png`} />
      </head>
      <body className="bg-[#0f0f10] text-white min-h-dvh flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <Image
            src={shareImage}
            alt="FarVibe"
            className="rounded-xl border border-white/10 w-full h-auto"
            priority
          />
          <div className="text-xl font-semibold">FarVibe</div>
          <div className="text-sm text-white/60 break-all">{address}</div>
          <div className="text-xs text-white/40">
            Open FarVibe in Farcaster and get your track.
          </div>
        </div>
      </body>
    </html>
  )
}
