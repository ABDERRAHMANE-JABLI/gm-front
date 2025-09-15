import { Metadata } from 'next'
import PersonDetailPage from '@/page-components/PersonDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const personName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${personName} | Profil Gault&Millau`,
    en: `${personName} | Gault&Millau Profile`
  }
  
  const descriptions = {
    fr: `Découvrez le profil de ${personName}. Chef, producteur ou personnalité du monde gastronomique français sélectionné par Gault&Millau.`,
    en: `Discover the profile of ${personName}. Chef, producer or personality from the French gastronomic world selected by Gault&Millau.`
  }

  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
    openGraph: {
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      type: 'profile',
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  
  return <PersonDetailPage lang={lang} slug={slug} />
}
