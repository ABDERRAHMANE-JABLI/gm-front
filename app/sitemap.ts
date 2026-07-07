import type { MetadataRoute } from 'next'
import { fetchRestaurants } from '@/lib/api/restaurants'
import { fetchHotels } from '@/lib/api/hotels'
import { fetchArtisans } from '@/lib/api/artisans'
import { fetchArticles } from '@/lib/api/articles'

// Régénère le sitemap au max une fois par jour (ISR) : le nouveau contenu apparaît
// dans les 24h sans redéploiement. /sitemap.xml reste toujours accessible (le cache
// précédent est servi pendant la régénération en arrière-plan).
export const revalidate = 86400

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
const langs = ['fr', 'en']

const staticRoutes = [
  '',
  '/restaurants',
  '/hotels',
  '/artisans',
  '/blogs',
  '/partners',
  '/store',
  '/contact',
]

// Construit une entrée par langue, chacune avec les alternances hreflang fr/en
function localizedEntries(
  path: string,
  extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>,
): MetadataRoute.Sitemap {
  return langs.map((lang) => ({
    url: `${baseUrl}/${lang}${path}`,
    alternates: {
      languages: {
        fr: `${baseUrl}/fr${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    ...extra,
  }))
}

async function allRestaurantSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { restaurants, pagination } = await fetchRestaurants({ page, limit: 50 })
      slugs.push(...restaurants.map(r => r.slug))
      if (page >= pagination.total_pages) break
      page++
    }
  } catch {}
  return slugs
}

async function allHotelSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { hotels, pagination } = await fetchHotels({ page, limit: 50 })
      slugs.push(...hotels.map(h => h.slug))
      if (page >= pagination.total_pages) break
      page++
    }
  } catch {}
  return slugs
}

async function allArtisanSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { artisans, pagination } = await fetchArtisans({ page, limit: 50 })
      slugs.push(...artisans.map(a => a.slug))
      if (page >= pagination.total_pages) break
      page++
    }
  } catch {}
  return slugs
}

async function allArticleSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { articles, pagination } = await fetchArticles({ page, limit: 50 })
      slugs.push(...articles.map(a => a.slug))
      if (page >= pagination.total_pages) break
      page++
    }
  } catch {}
  return slugs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    restaurantSlugs,
    hotelSlugs,
    artisanSlugs,
    articleSlugs,
  ] = await Promise.all([
    allRestaurantSlugs(),
    allHotelSlugs(),
    allArtisanSlugs(),
    allArticleSlugs(),
  ])

  const now = new Date()

  return [
    ...staticRoutes.flatMap((route) =>
      localizedEntries(route, {
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      }),
    ),
    ...restaurantSlugs.flatMap((slug) =>
      localizedEntries(`/restaurant/${slug}`, { changeFrequency: 'weekly', priority: 0.7 }),
    ),
    ...hotelSlugs.flatMap((slug) =>
      localizedEntries(`/hotels/${slug}`, { changeFrequency: 'weekly', priority: 0.7 }),
    ),
    ...artisanSlugs.flatMap((slug) =>
      localizedEntries(`/artisans/${slug}`, { changeFrequency: 'weekly', priority: 0.7 }),
    ),
    ...articleSlugs.flatMap((slug) =>
      localizedEntries(`/blogs/${slug}`, { changeFrequency: 'monthly', priority: 0.6 }),
    ),
  ]
}
