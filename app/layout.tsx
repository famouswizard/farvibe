import React from 'react'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'FarVibe',
  description: 'Your Base chain vibe in one track.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f10] text-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
