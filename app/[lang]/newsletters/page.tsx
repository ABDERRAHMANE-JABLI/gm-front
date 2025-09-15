import { Metadata } from 'next'
import NewslettersPage from '@/page-components/NewslettersPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    fr: 'Newsletters Gault&Millau | Abonnements',
    en: 'Gault&Millau Newsletters | Subscriptions'
  }
  
  const descriptions = {
    fr: 'Abonnez-vous aux newsletters Gault&Millau. Recevez nos dernières actualités gastronomiques, découvertes culinaires et recommandations d\'experts directement dans votre boîte mail.',
    en: 'Subscribe to Gault&Millau newsletters. Receive our latest gastronomic news, culinary discoveries and expert recommendations directly in your inbox.'
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
  
  return <NewslettersPage lang={lang} />
}
