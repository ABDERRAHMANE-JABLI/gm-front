import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import PersonDetailPage from '@/page-components/People/Detail'
import { fetchTalentDetail } from '@/lib/api/talents'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const person = await fetchTalentDetail(slug)
  const name = person?.fullName ?? slug.replace(/-/g, ' ')
  const description = person?.resume ?? `Découvrez ${name}, sélectionné par Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = person?.thumbId ? `${s3}/${person.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/peoples/${slug}`

  return {
    title: `${name} | Gault&Millau`,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/peoples/${slug}`,
        en: `${siteUrl}/en/peoples/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Gault&Millau`,
      description,
      url,
      siteName: 'Gault&Millau Maroc',
      type: 'profile',
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
  const [person, partners] = await Promise.all([
    fetchTalentDetail(slug),
    fetchPartners(),
  ])

  if (!person) notFound()

  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const image = person.thumbId ? `${s3}/${person.thumbId}` : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.fullName,
    description: person.resume ?? undefined,
    url: `${siteUrl}/${lang}/peoples/${slug}`,
    ...(image && { image }),
    ...(person.roles?.length && { jobTitle: person.roles[0] }),
    ...(person.chefAt?.[0]?.name && { worksFor: { '@type': 'Organization', name: person.chefAt[0].name } }),
  }

  return (
    <Layout language={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PersonDetailPage lang={lang} person={person} partners={partners} />
    </Layout>
  )
}
