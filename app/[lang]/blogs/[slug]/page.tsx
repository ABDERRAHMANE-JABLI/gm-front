import { Metadata } from 'next'
import BlogDetailPage from '@/page-components/BlogDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const blogTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${blogTitle} | Blog Gault&Millau`,
    en: `${blogTitle} | Gault&Millau Blog`
  }
  
  const descriptions = {
    fr: `Lisez ${blogTitle} sur le blog Gault&Millau. Actualités gastronomiques, tendances culinaires et conseils d'experts.`,
    en: `Read ${blogTitle} on the Gault&Millau blog. Gastronomic news, culinary trends and expert advice.`
  }

  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
    openGraph: {
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      type: 'article',
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  
  return <BlogDetailPage lang={lang} slug={slug} />
}
