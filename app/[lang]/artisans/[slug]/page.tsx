import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import ArtisanDetailPage from '@/page-components/Artisans/Detail'
import { fetchArtisanDetail } from '@/lib/api/artisans'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'
import { jsonLdString } from '@/lib/utils/jsonLd'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

function buildSeoTitle(lang: Language, name: string, activity?: string, city?: string): string {
  const label = activity ? `${name.trim()}, ${activity.trim()}` : name.trim()
  if (!city) return label
  const cityName = `${city.charAt(0).toUpperCase()}${city.slice(1)}`
  return activity ? `${label} ${lang === 'en' ? 'in' : 'à'} ${cityName}` : `${label}, ${cityName}`
}

function buildSeoDescription(lang: Language, title: string, avis?: string | null): string {
  if (lang === 'en') return `${title}: review, address and contact. Selected by Gault&Millau Morocco.`
  if (!avis) return `${title} : avis, adresse et contact. Sélectionné par Gault&Millau Maroc.`
  return avis.length <= 155 ? avis : `${avis.slice(0, avis.lastIndexOf(' ', 155))}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const artisan = await fetchArtisanDetail(slug)
  const name = artisan?.title ?? slug.replace(/-/g, ' ')
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = artisan?.thumbId ? `${s3}/${artisan.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/artisans/${slug}`
  const title = buildSeoTitle(lang, name, artisan?.mainActivity?.libelle, artisan?.city?.cityName)
  const description = buildSeoDescription(lang, title, artisan?.avisGM)

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/artisans/${slug}`,
        en: `${siteUrl}/en/artisans/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Gault&Millau Maroc`,
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
      title: `${title} | Gault&Millau Maroc`,
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

  if (!artisan) redirect(`/${lang}`)

  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const image = artisan.thumbId ? `${s3}/${artisan.thumbId}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: artisan.title,
    description: artisan.avisGM ?? undefined,
    url: `${siteUrl}/${lang}/artisans/${slug}`,
    ...(image && { image }),
    ...(artisan.city?.cityName && { address: { '@type': 'PostalAddress', addressLocality: artisan.city.cityName, streetAddress: artisan.adresse } }),
    ...(artisan.mainActivity?.libelle && { knowsAbout: artisan.mainActivity.libelle }),
    ...(artisan.tel && { telephone: artisan.tel }),
    ...(artisan.website && { sameAs: artisan.website }),
  }

  return (
    <Layout language={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <ArtisanDetailPage lang={lang} artisan={artisan} partners={partners} />
    </Layout>
  )
}
