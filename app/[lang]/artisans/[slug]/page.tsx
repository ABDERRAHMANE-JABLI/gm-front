import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import ArtisanDetailPage from '@/page-components/Artisans/Detail'
import { fetchArtisanDetail } from '@/lib/api/artisans'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const artisan = await fetchArtisanDetail(slug)
  const name = artisan?.title ?? slug.replace(/-/g, ' ')
  const description = artisan?.avisGM ?? `Découvrez ${name}, artisan sélectionné par Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = artisan?.thumbId ? `${s3}/${artisan.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/artisans/${slug}`

  return {
    title: `${name} | Gault&Millau`,
    description,
    openGraph: {
      title: `${name} | Gault&Millau`,
      description,
      url,
      siteName: 'Gault&Millau Maroc',
      type: 'website',
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: name }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Gault&Millau`,
      description,
      ...(image && { images: [image] }),
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  const [artisan, partners] = await Promise.all([
    fetchArtisanDetail(slug),
    fetchPartners(),
  ])

  if (!artisan) notFound()

  return (
    <Layout language={lang}>
      <ArtisanDetailPage lang={lang} artisan={artisan} partners={partners} />
    </Layout>
  )
}
