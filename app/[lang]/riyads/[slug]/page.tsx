import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import RiyadDetailPage from '@/page-components/Riyads/Detail'
import { fetchRiyadDetail } from '@/lib/api/riyads'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const riyad = await fetchRiyadDetail(slug)
  const name = riyad?.name ?? slug.replace(/-/g, ' ')
  const description = riyad?.avisGM ?? `Découvrez ${name}, riyad sélectionné par Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = riyad?.thumbId ? `${s3}/${riyad.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/riyads/${slug}`

  return {
    title: `${name} | Gault&Millau`,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/riyads/${slug}`,
        en: `${siteUrl}/en/riyads/${slug}`,
      },
    },
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
  const [riyad, partners] = await Promise.all([
    fetchRiyadDetail(slug),
    fetchPartners(),
  ])

  if (!riyad) notFound()

  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const image = riyad.thumbId ? `${s3}/${riyad.thumbId}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: riyad.name,
    description: riyad.avisGM ?? undefined,
    url: `${siteUrl}/${lang}/riyads/${slug}`,
    ...(image && { image }),
    ...(riyad.city?.cityName && { address: { '@type': 'PostalAddress', addressLocality: riyad.city.cityName, streetAddress: riyad.adresse } }),
    ...(riyad.nbrStars && { starRating: { '@type': 'Rating', ratingValue: riyad.nbrStars } }),
    ...(riyad.noteGM != null && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: riyad.noteGM, bestRating: 20, ratingCount: 1 },
    }),
    ...(riyad.website && { sameAs: riyad.website }),
  }

  return (
    <Layout language={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RiyadDetailPage lang={lang} riyad={riyad} partners={partners} />
    </Layout>
  )
}
