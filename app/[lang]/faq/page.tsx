import { Metadata } from 'next'
import FAQPage from '@/page-components/FAQPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  
  const titles = {
    fr: 'FAQ - Questions Fréquentes | Gault&Millau',
    en: 'FAQ - Frequently Asked Questions | Gault&Millau'
  }
  
  const descriptions = {
    fr: 'Trouvez les réponses aux questions les plus fréquentes sur Gault&Millau. Guide d\'utilisation, informations sur nos services, critères de notation et bien plus.',
    en: 'Find answers to the most frequently asked questions about Gault&Millau. User guide, information about our services, rating criteria and much more.'
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
  
  return <FAQPage lang={lang} />
}
