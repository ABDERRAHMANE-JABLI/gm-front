import { Metadata } from 'next'
import CooksOfTomorrowPage from '@/page-components/CooksOfTomorrowPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    fr: 'Cuisiniers de Demain | Gault&Millau',
    en: 'Cooks of Tomorrow | Gault&Millau'
  }
  
  const descriptions = {
    fr: 'Découvrez les talents culinaires de demain. Jeunes chefs prometteurs, étudiants en cuisine et futurs grands noms de la gastronomie française sélectionnés par Gault&Millau.',
    en: 'Discover the culinary talents of tomorrow. Promising young chefs, culinary students and future great names in French gastronomy selected by Gault&Millau.'
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
  
  return <CooksOfTomorrowPage lang={lang} />
}
