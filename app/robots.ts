import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/fr/info/', '/en/info/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
