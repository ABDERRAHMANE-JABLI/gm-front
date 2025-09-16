import { Metadata } from 'next'
import ArtisanDetailPage from '@/page-components/Artisans/Detail'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const artisanName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${artisanName} | Artisan Gault&Millau`,
    en: `${artisanName} | Gault&Millau Artisan`
  }
  
  const descriptions = {
    fr: `Découvrez ${artisanName}, artisan sélectionné par Gault&Millau. Savoir-faire traditionnel, produits d'exception et passion du métier.`,
    en: `Discover ${artisanName}, artisan selected by Gault&Millau. Traditional know-how, exceptional products and passion for the craft.`
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
  
  return <ArtisanDetailPage lang={lang} slug={slug} />
}
