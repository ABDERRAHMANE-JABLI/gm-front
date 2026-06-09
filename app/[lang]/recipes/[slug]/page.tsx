import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/layout/Layout/Layout'
import RecipeDetailPage from '@/page-components/Recipes/Detail'
import { fetchRecipeDetail } from '@/lib/api/recipes'
import { fetchPartners } from '@/lib/api/partners'
import { Language } from '@/lib/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params
  const recipe = await fetchRecipeDetail(slug)
  const title = recipe?.title ?? slug.replace(/-/g, ' ')
  const description = recipe?.resume ?? `Découvrez cette recette sur Gault&Millau.`
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? ''
  const image = recipe?.thumbId ? `${s3}/${recipe.thumbId}` : undefined
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const url = `${siteUrl}/${lang}/recipes/${slug}`

  return {
    title: `${title} | Gault&Millau`,
    description,
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
  const [recipe, partners] = await Promise.all([
    fetchRecipeDetail(slug),
    fetchPartners(),
  ])

  if (!recipe) notFound()

  return (
    <Layout language={lang}>
      <RecipeDetailPage lang={lang} recipe={recipe} partners={partners} />
    </Layout>
  )
}
