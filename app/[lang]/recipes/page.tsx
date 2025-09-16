import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipesPage from '@/page-components/Recipes/List';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    lang: 'fr' | 'en';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    fr: 'Recherche de recettes - Gault&Millau',
    en: 'Recipe search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleures recettes des chefs étoilés et restaurants Gault&Millau. Techniques culinaires et saveurs d\'exception.',
    en: 'Discover the best recipes from starred chefs and Gault&Millau restaurants. Culinary techniques and exceptional flavors.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function RecipeSearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <RecipesPage lang={lang} />;
}
