import type { NextConfig } from "next";

const S3_HOST = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';

// Content-Security-Policy.
// script-src garde 'unsafe-inline'/'unsafe-eval' car Next.js (App Router) injecte
// des scripts d'hydratation inline sans nonce ; le XSS est déjà neutralisé en amont
// par la sanitization DOMPurify du contenu CMS. La CSP sert ici de défense en
// profondeur : elle verrouille object/base/form, le clickjacking (frame-ancestors)
// et restreint les sources d'images, de frames et de connexions sortantes.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https:",
  `frame-src 'self' ${S3_HOST} https://docs.google.com https://maps.google.com https://www.google.com https://www.youtube.com https://player.vimeo.com`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].filter(Boolean).join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy',    value: csp },
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gaultmillau.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets-gaultmillau-maroc.s3.eu-west-par.io.cloud.ovh.net',
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
