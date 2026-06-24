import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import BlogDetailPage from '@/page-components/Blogs/Detail'
import { fetchArticleDetail } from '@/lib/api/articles'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'
import { jsonLdString } from '@/lib/utils/jsonLd'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const article = await fetchArticleDetail(slug)
  const title = article?.title ?? slug.replace(/-/g, ' ')
  const description = article?.resume ?? `Découvrez cet article sur Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = article?.thumbId ? `${s3}/${article.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/blogs/${slug}`

  return {
    title: `${title} | Gault&Millau`,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/blogs/${slug}`,
        en: `${siteUrl}/en/blogs/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Gault&Millau`,
      description,
      url,
      siteName: 'Gault&Millau Maroc',
      type: 'article',
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Gault&Millau`,
      description,
      ...(image && { images: [image] }),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  const [article, partners] = await Promise.all([
    fetchArticleDetail(slug),
    fetchPartners(),
  ])

  if (!article) notFound()

  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const image = article.thumbId ? `${s3}/${article.thumbId}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.resume,
    url: `${siteUrl}/${lang}/blogs/${slug}`,
    ...(image && { image }),
    datePublished: article.createdAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    publisher: {
      '@type': 'Organization',
      name: 'Gault&Millau Maroc',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/image_seo.png` },
    },
  }

  return (
    <Layout language={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <BlogDetailPage lang={lang} article={article} partners={partners} />
    </Layout>
  )
}
