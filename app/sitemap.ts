import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
const langs = ['fr', 'en']

const staticRoutes = [
  '',
  '/restaurants',
  '/hotels',
  '/riyads',
  '/artisans',
  '/peoples',
  '/recipes',
  '/blogs',
  '/partners',
  '/utensils',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
