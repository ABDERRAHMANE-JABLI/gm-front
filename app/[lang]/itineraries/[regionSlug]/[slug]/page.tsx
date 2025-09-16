import { Metadata } from 'next'
import ItineraryDetailPage from '@/page-components/Itineraries/Detail'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; regionSlug: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, regionSlug, slug } = await params
  
  const itineraryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const regionName = regionSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${itineraryName} en ${regionName} | Itinéraire Gault&Millau`,
    en: `${itineraryName} in ${regionName} | Gault&Millau Itinerary`
  }
  
  const descriptions = {
    fr: `Découvrez l'itinéraire ${itineraryName} en ${regionName}. Circuit gastronomique et route des saveurs sélectionnés par Gault&Millau.`,
    en: `Discover the ${itineraryName} itinerary in ${regionName}. Gastronomic circuit and flavor route selected by Gault&Millau.`
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
  const { lang, regionSlug, slug } = await params
  
  return <ItineraryDetailPage lang={lang} regionSlug={regionSlug} slug={slug} />
}
