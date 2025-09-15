import { Metadata } from 'next'
import WineDetailPage from '@/page-components/WineDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; winerySlug: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, winerySlug, slug } = await params
  
  const wineName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const wineryName = winerySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${wineName} - ${wineryName} | Vin Gault&Millau`,
    en: `${wineName} - ${wineryName} | Gault&Millau Wine`
  }
  
  const descriptions = {
    fr: `Découvrez ${wineName} du domaine ${wineryName}, vin sélectionné par Gault&Millau. Notes de dégustation, millésime et accords mets-vins.`,
    en: `Discover ${wineName} from ${wineryName} estate, wine selected by Gault&Millau. Tasting notes, vintage and food-wine pairings.`
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
  const { lang, winerySlug, slug } = await params
  
  return <WineDetailPage lang={lang} winerySlug={winerySlug} slug={slug} />
}
