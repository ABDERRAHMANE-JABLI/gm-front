import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import RestaurantDetailPage from '@/page-components/Restaurants/Detail'
import { fetchRestaurantDetail } from '@/lib/api/restaurants'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const restaurant = await fetchRestaurantDetail(slug)
  const name = restaurant?.name ?? slug.replace(/-/g, ' ')
  const description = restaurant?.avisGM ?? `Découvrez ${name}, restaurant sélectionné par Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = restaurant?.thumbId ? `${s3}/${restaurant.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/restaurant/${slug}`

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
  const [restaurant, partners] = await Promise.all([
    fetchRestaurantDetail(slug),
    fetchPartners(),
  ])

  if (!restaurant) notFound()

  return (
    <Layout language={lang}>
      <RestaurantDetailPage lang={lang} restaurant={restaurant} partners={partners} />
    </Layout>
  )
}
