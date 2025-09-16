import { Metadata } from 'next'
import ItinerariesPage from '@/page-components/Itineraries/List'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    fr: 'Itinéraires Gastronomiques | Gault&Millau',
    en: 'Gastronomic Itineraries | Gault&Millau'
  }
  
  const descriptions = {
    fr: 'Découvrez nos itinéraires gastronomiques et routes des saveurs. Explorez les meilleures adresses culinaires, circuits gourmands et escapades gastronomiques sélectionnées par Gault&Millau.',
    en: 'Discover our gastronomic itineraries and flavor routes. Explore the best culinary addresses, gourmet circuits and gastronomic getaways selected by Gault&Millau.'
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
  const { lang } = await params
  
  return <ItinerariesPage lang={lang} />
}
