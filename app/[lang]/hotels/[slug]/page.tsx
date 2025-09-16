import { Metadata } from 'next'
import HotelDetailPage from '@/page-components/Hotels/Detail'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const hotelName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${hotelName} | Hôtel Gault&Millau`,
    en: `${hotelName} | Gault&Millau Hotel`
  }
  
  const descriptions = {
    fr: `Découvrez ${hotelName}, hôtel sélectionné par Gault&Millau. Excellence hôtelière, gastronomie et art de vivre à la française.`,
    en: `Discover ${hotelName}, hotel selected by Gault&Millau. Hotel excellence, gastronomy and French art of living.`
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
  
  return <HotelDetailPage lang={lang} slug={slug} />
}
