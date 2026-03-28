import { fetchRecipes, fetchRecipeFilters } from '@/lib/api/recipes';
import RecipesContent from './RecipesContent';

type Language = 'fr' | 'en';

interface RecipesPageProps {
  lang: Language;
}

export default async function RecipesPage({ lang }: RecipesPageProps) {
  const [{ recipes, pagination }, filters] = await Promise.all([
    fetchRecipes({ page: 1, limit: 9 }),
    fetchRecipeFilters(),
  ]);

  return (
    <RecipesContent
      lang={lang}
      initialRecipes={recipes}
      initialPagination={pagination}
      filters={filters}
    />
  );
}
