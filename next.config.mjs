/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@farcaster/miniapp-sdk',
      '@farcaster/miniapp-wagmi-connector',
      'wagmi',
      '@tanstack/react-query',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farvibe.netlify.app',
      },
    ],
  },
};

export default nextConfig;
