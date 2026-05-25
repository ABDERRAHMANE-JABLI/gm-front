import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import PartnersPage from '@/page-components/PartnersPage'
import { Language } from '@/lib/types'
import { fetchPartners } from '@/lib/api/partners'

interface Props {
  params: Promise<{ lang: Language }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles = {
    fr: 'Nos Partenaires | Gault&Millau',
    en: 'Our Partners | Gault&Millau',
  }
  const descriptions = {
    fr: 'Découvrez nos partenaires prestigieux qui partagent nos valeurs d\'excellence gastronomique.',
    en: 'Discover our prestigious partners who share our values of gastronomic excellence.',
  }
  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const partners = await fetchPartners()
  return (
    <Layout language={lang}>
      <PartnersPage lang={lang} partners={partners} />
    </Layout>
  )
}
