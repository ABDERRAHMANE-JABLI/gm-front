import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import PersonDetailPage from '@/page-components/People/Detail'
import { fetchTalentDetail } from '@/lib/api/talents'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'
import { jsonLdString } from '@/lib/utils/jsonLd'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

// Titre SEO : « Prénom Nom, chef chez Restaurant » (le suffixe vient du layout).
function buildSeoTitle(lang: Language, name: string, role?: string, place?: string): string {
  const label = role ? `${name.trim()}, ${role.trim()}` : name.trim()
  if (!place) return label
  return role ? `${label} ${lang === 'en' ? 'at' : 'chez'} ${place.trim()}` : `${label}, ${place.trim()}`
}

// Description SEO : début du résumé coupé à 155 caractères (affichage Google).
// En anglais, phrase générée : le résumé n'existe qu'en français.
function buildSeoDescription(lang: Language, title: string, resume?: string | null): string {
  if (lang === 'en') return `${title}: portrait, career and awards. Selected by Gault&Millau Morocco.`
  if (!resume) return `${title} : portrait, parcours et distinctions. Sélectionné par Gault&Millau Maroc.`
  return resume.length <= 155 ? resume : `${resume.slice(0, resume.lastIndexOf(' ', 155))}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const person = await fetchTalentDetail(slug)
  const name = person?.fullName ?? slug.replace(/-/g, ' ')
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = person?.thumbId ? `${s3}/${person.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/peoples/${slug}`
  const title = buildSeoTitle(lang, name, person?.roles?.[0], person?.chefAt?.[0]?.name)
  const description = buildSeoDescription(lang, title, person?.resume)

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/peoples/${slug}`,
        en: `${siteUrl}/en/peoples/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Gault&Millau Maroc`,
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
      title: `${title} | Gault&Millau Maroc`,
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

  if (!person) redirect(`/${lang}`)

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <PersonDetailPage lang={lang} person={person} partners={partners} />
    </Layout>
  )
}
