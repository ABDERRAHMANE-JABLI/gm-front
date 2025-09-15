import { Metadata } from 'next'
import RecipeDetailPage from '@/page-components/RecipeDetailPage'
import { Language } from '@/lib/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  
  const recipeName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const titles = {
    fr: `${recipeName} | Recette Gault&Millau`,
    en: `${recipeName} | Gault&Millau Recipe`
  }
  
  const descriptions = {
    fr: `Découvrez la recette ${recipeName} par Gault&Millau. Ingrédients, préparation et conseils de chefs pour réussir ce plat d'exception.`,
    en: `Discover the ${recipeName} recipe by Gault&Millau. Ingredients, preparation and chef tips to succeed with this exceptional dish.`
  }

  return {
    title: titles[lang] || titles.fr,
    description: descriptions[lang] || descriptions.fr,
    openGraph: {
      title: titles[lang] || titles.fr,
      description: descriptions[lang] || descriptions.fr,
      type: 'article',
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params
  
  return <RecipeDetailPage lang={lang} slug={slug} />
}
