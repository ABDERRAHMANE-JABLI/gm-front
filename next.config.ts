import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.gaultmillau.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fr.gaultmillau.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/fr',
      },
    ];
  },
};

export default nextConfig;
