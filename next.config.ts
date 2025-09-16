import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
        hostname: '*.gaultmillau.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '*.gm.wip',
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
