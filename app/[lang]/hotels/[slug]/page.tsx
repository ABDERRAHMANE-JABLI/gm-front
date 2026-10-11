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

// Titre SEO : « Hôtel Amanjena, Marrakech » (le suffixe vient du layout).
// Pas de « Hôtel » si le nom contient déjà hôtel/hotel/riad, pas de ville si le
// nom la contient déjà (ex. « Park Hyatt Marrakech »).
function buildSeoTitle(lang: Language, name: string, city?: string): string {
  const n = name.trim()
  const label = /h[oô]tel|riad/i.test(n) ? n : `${lang === 'en' ? 'Hotel' : 'Hôtel'} ${n}`
  if (!city || n.toLowerCase().includes(city.toLowerCase())) return label
  return `${label}, ${city.charAt(0).toUpperCase()}${city.slice(1)}`
}

// Description SEO : début de l'avis coupé à 155 caractères (affichage Google).
// En anglais, phrase générée : l'avis n'existe qu'en français.
function buildSeoDescription(lang: Language, title: string, avis?: string | null): string {
  if (lang === 'en') return `${title}: review, address, services and booking. Selected by Gault&Millau Morocco.`
  if (!avis) return `${title} : avis, adresse, services et réservation. Sélectionné par Gault&Millau Maroc.`
  return avis.length <= 155 ? avis : `${avis.slice(0, avis.lastIndexOf(' ', 155))}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const hotel = await fetchHotelDetail(slug)
  const name = hotel?.name ?? slug.replace(/-/g, ' ')
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = hotel?.thumbId ? `${s3}/${hotel.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/hotels/${slug}`
  const title = buildSeoTitle(lang, name, hotel?.city?.cityName)
  const description = buildSeoDescription(lang, title, hotel?.avisGM)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/hotels/${slug}`,
        en: `${siteUrl}/en/hotels/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Gault&Millau Maroc`,
      description,
      url,
      siteName: 'Gault&Millau Maroc',
      type: 'website',
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Gault&Millau Maroc`,
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
