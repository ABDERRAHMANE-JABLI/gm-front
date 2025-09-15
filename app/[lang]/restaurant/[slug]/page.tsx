import { Metadata } from 'next'
import RestaurantDetailPage from '@/page-components/RestaurantDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  // In a real app, you would fetch restaurant data based on the slug
  // For now, we'll use placeholder metadata
  const restaurantName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${restaurantName} | Restaurant Gault&Millau`,
    en: `${restaurantName} | Gault&Millau Restaurant`
  }
  
  const descriptions = {
    fr: `Découvrez ${restaurantName}, restaurant sélectionné par Gault&Millau. Consultez notre critique, les notes, avis, photos, menu et informations pratiques.`,
    en: `Discover ${restaurantName}, restaurant selected by Gault&Millau. Check our review, ratings, opinions, photos, menu and practical information.`
  }

  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
    openGraph: {
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  
  return <RestaurantDetailPage lang={lang} slug={slug} />
}
