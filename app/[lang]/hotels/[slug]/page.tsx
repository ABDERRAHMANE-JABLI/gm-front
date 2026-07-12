import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import HotelDetailPage from '@/page-components/Hotels/Detail'
import { fetchHotelDetail } from '@/lib/api/hotels'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'
import { jsonLdString } from '@/lib/utils/jsonLd'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const hotel = await fetchHotelDetail(slug)
  const name = hotel?.name ?? slug.replace(/-/g, ' ')
  const description = hotel?.avisGM ?? `Découvrez ${name}, hôtel sélectionné par Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = hotel?.thumbId ? `${s3}/${hotel.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/hotels/${slug}`

  return {
    title: `${name} | Gault&Millau`,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/hotels/${slug}`,
        en: `${siteUrl}/en/hotels/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Gault&Millau`,
      description,
      url,
      siteName: 'Gault&Millau Maroc',
      type: 'website',
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: name }] }),
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
  const [hotel, partners] = await Promise.all([
    fetchHotelDetail(slug),
    fetchPartners(),
  ])

  if (!hotel) redirect(`/${lang}`)

  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const image = hotel.thumbId ? `${s3}/${hotel.thumbId}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: hotel.name,
    description: hotel.avisGM ?? undefined,
    url: `${siteUrl}/${lang}/hotels/${slug}`,
    ...(image && { image }),
    ...(hotel.city?.cityName && { address: { '@type': 'PostalAddress', addressLocality: hotel.city.cityName, streetAddress: hotel.adresse } }),
    ...(hotel.nbrStars && { starRating: { '@type': 'Rating', ratingValue: hotel.nbrStars } }),
    ...(hotel.noteGM != null && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: hotel.noteGM,
        bestRating: 20,
        ratingCount: 1,
      },
    }),
    ...(hotel.website && { sameAs: hotel.website }),
  }

  return (
    <Layout language={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <HotelDetailPage lang={lang} hotel={hotel} partners={partners} />
    </Layout>
  )
}
