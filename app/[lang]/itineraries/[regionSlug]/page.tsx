import { Metadata } from 'next'
import RegionItinerariesPage from '@/page-components/RegionItinerariesPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; regionSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, regionSlug } = await params
  
  // Convert region slug to display name
  const regionNames: Record<string, { fr: string; en: string }> = {
    'auvergne-rhone-alpes': {
      fr: 'Auvergne-Rhône-Alpes',
      en: 'Auvergne-Rhône-Alpes'
    },
    'bourgogne-franche-comte': {
      fr: 'Bourgogne-Franche-Comté',
      en: 'Burgundy-Franche-Comté'
    },
    'bretagne': {
      fr: 'Bretagne',
      en: 'Brittany'
    },
    'centre-val-de-loire': {
      fr: 'Centre-Val de Loire',
      en: 'Centre-Val de Loire'
    },
    'corse': {
      fr: 'Corse',
      en: 'Corsica'
    },
    'grand-est': {
      fr: 'Grand Est',
      en: 'Grand Est'
    },
    'hauts-de-france': {
      fr: 'Hauts-de-France',
      en: 'Hauts-de-France'
    },
    'ile-de-france': {
      fr: 'Île-de-France',
      en: 'Île-de-France'
    },
    'normandie': {
      fr: 'Normandie',
      en: 'Normandy'
    },
    'nouvelle-aquitaine': {
      fr: 'Nouvelle-Aquitaine',
      en: 'Nouvelle-Aquitaine'
    },
    'occitanie': {
      fr: 'Occitanie',
      en: 'Occitanie'
    },
    'pays-de-la-loire': {
      fr: 'Pays de la Loire',
      en: 'Pays de la Loire'
    },
    'provence-alpes-cote-azur': {
      fr: 'Provence-Alpes-Côte d\'Azur',
      en: 'Provence-Alpes-Côte d\'Azur'
    }
  }

  const regionName = regionNames[regionSlug]?.[lang] || regionNames[regionSlug]?.fr || regionSlug

  const titles = {
    fr: `Itinéraires Gastronomiques ${regionName} | Gault&Millau`,
    en: `Gastronomic Itineraries ${regionName} | Gault&Millau`
  }
  
  const descriptions = {
    fr: `Découvrez les meilleurs itinéraires gastronomiques en ${regionName}. Routes des saveurs, circuits gourmands et escapades culinaires sélectionnées par Gault&Millau.`,
    en: `Discover the best gastronomic itineraries in ${regionName}. Flavor routes, gourmet circuits and culinary getaways selected by Gault&Millau.`
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
  const { lang, regionSlug } = await params
  
  return <RegionItinerariesPage lang={lang} region={regionSlug} />
}
