import type { MetadataRoute } from 'next'
import { fetchRestaurants } from '@/lib/api/restaurants'
import { fetchHotels } from '@/lib/api/hotels'
import { fetchArtisans } from '@/lib/api/artisans'
import { fetchTalents } from '@/lib/api/talents'
import { fetchRecipes } from '@/lib/api/recipes'
import { fetchArticles } from '@/lib/api/articles'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
const langs = ['fr', 'en']

const staticRoutes = [
  '',
  '/restaurants',
  '/hotels',
  '/artisans',
  '/peoples',
  '/recipes',
  '/blogs',
  '/partners',
  '/utensils',
]

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

async function allTalentSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { talents, pagination } = await fetchTalents({ page, limit: 50 })
      slugs.push(...talents.map(t => t.slug))
      if (page >= pagination.total_pages) break
      page++
    }
  } catch {}
  return slugs
}

async function allRecipeSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  try {
    while (true) {
      const { recipes, pagination } = await fetchRecipes({ page, limit: 50 })
      slugs.push(...recipes.map(r => r.slug))
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
    talentSlugs,
    recipeSlugs,
    articleSlugs,
  ] = await Promise.all([
    allRestaurantSlugs(),
    allHotelSlugs(),
    allArtisanSlugs(),
    allTalentSlugs(),
    allRecipeSlugs(),
    allArticleSlugs(),
  ])

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

    for (const slug of restaurantSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/restaurant/${slug}`, changeFrequency: 'weekly', priority: 0.7 })
    }
    for (const slug of hotelSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/hotels/${slug}`, changeFrequency: 'weekly', priority: 0.7 })
    }
for (const slug of artisanSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/artisans/${slug}`, changeFrequency: 'weekly', priority: 0.7 })
    }
    for (const slug of talentSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/peoples/${slug}`, changeFrequency: 'monthly', priority: 0.6 })
    }
    for (const slug of recipeSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/recipes/${slug}`, changeFrequency: 'monthly', priority: 0.6 })
    }
    for (const slug of articleSlugs) {
      entries.push({ url: `${baseUrl}/${lang}/blogs/${slug}`, changeFrequency: 'monthly', priority: 0.6 })
    }
  }

  return entries
}
