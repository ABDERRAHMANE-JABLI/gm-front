import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins:['*.gm.wip','localhost:3000'],
  webpack(config) {
    // Configuration pour transformer les SVG en composants React
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      }],
    });

    return config;
  },
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
