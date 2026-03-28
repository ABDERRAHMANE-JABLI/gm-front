import Layout from "@/components/layout/Layout/Layout";
import RecipesContent from "@/page-components/Recipes/List/RecipesContent";
import { fetchRecipes, fetchRecipeFilters } from "@/lib/api/recipes";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recettes - Gault&Millau',
    description: 'Découvrez les meilleures recettes des chefs sélectionnés par Gault&Millau Maroc',
  };
}

export default async function RecipesPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ recipes, pagination }, filters] = await Promise.all([
    fetchRecipes({ page: 1, limit: 9 }),
    fetchRecipeFilters(),
  ]);

  return (
    <Layout language={language}>
      <RecipesContent
        lang={language}
        initialRecipes={recipes}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
