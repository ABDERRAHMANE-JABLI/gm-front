import { Metadata } from 'next'
import SpiritDetailPage from '@/page-components/SpiritDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const spiritName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${spiritName} | Spiritueux Gault&Millau`,
    en: `${spiritName} | Gault&Millau Spirit`
  }
  
  const descriptions = {
    fr: `Découvrez ${spiritName}, spiritueux sélectionné par Gault&Millau. Notes de dégustation, origine et conseils d'experts.`,
    en: `Discover ${spiritName}, spirit selected by Gault&Millau. Tasting notes, origin and expert advice.`
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
  
  return <SpiritDetailPage lang={lang} slug={slug} />
}
