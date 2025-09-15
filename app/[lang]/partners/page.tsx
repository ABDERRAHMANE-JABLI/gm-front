import { Metadata } from 'next'
import PartnersPage from '@/page-components/PartnersPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    fr: 'Nos Partenaires | Gault&Millau',
    en: 'Our Partners | Gault&Millau'
  }
  
  const descriptions = {
    fr: 'Découvrez nos partenaires prestigieux. Établissements d\'exception, producteurs de qualité et artisans passionnés qui partagent nos valeurs d\'excellence gastronomique.',
    en: 'Discover our prestigious partners. Exceptional establishments, quality producers and passionate artisans who share our values of gastronomic excellence.'
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
  
  return <PartnersPage lang={lang} />
}
