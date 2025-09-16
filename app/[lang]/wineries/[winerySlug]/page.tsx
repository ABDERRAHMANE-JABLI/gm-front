import { Metadata } from 'next'
import WineryDetailPage from '@/page-components/Wineries/Detail'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; winerySlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, winerySlug } = await params

  const wineryName = winerySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  const titles = {
    fr: `${wineryName} | Domaine Viticole Gault&Millau`,
    en: `${wineryName} | Gault&Millau Winery`
  }
  
  const descriptions = {
    fr: `Découvrez ${wineryName}, domaine viticole sélectionné par Gault&Millau. Terroir d'exception, cuvées prestigieuses et savoir-faire traditionnel.`,
    en: `Discover ${wineryName}, winery selected by Gault&Millau. Exceptional terroir, prestigious vintages and traditional know-how.`
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
  const { lang, winerySlug } = await params

  return <WineryDetailPage lang={lang} winerySlug={winerySlug} />
}
