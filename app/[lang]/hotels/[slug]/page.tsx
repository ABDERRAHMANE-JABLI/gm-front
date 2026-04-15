import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import HotelDetailPage from '@/page-components/Hotels/Detail'
import { fetchHotelDetail } from '@/lib/api/hotels'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hotel = await fetchHotelDetail(slug)
  const name = hotel?.name ?? slug.replace(/-/g, ' ')

  return {
    title: `${name} | Gault&Millau`,
    description: hotel?.avisGM ?? `Découvrez ${name}, hôtel sélectionné par Gault&Millau.`,
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  const [hotel, partners] = await Promise.all([
    fetchHotelDetail(slug),
    fetchPartners(),
  ])

  if (!hotel) notFound()

  return (
    <Layout language={lang}>
      <HotelDetailPage lang={lang} hotel={hotel} partners={partners} />
    </Layout>
  )
}
