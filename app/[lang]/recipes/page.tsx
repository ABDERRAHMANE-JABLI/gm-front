import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Layout from "@/components/layout/Layout/Layout";
import RecipesContent from "@/page-components/Recipes/List/RecipesContent";
import { fetchRecipes, fetchRecipeFilters } from "@/lib/api/recipes";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recettes - Gault&Millau',
    description: 'Découvrez les meilleures recettes des chefs sélectionnés par Gault&Millau Maroc',
    robots: { index: false, follow: false },
  };
}

async function RecipesData({ lang }: { lang: Language }) {
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

export default async function RecipesPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  // Section Recettes désactivée
  notFound();

  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <RecipesData lang={language} />
      </Suspense>
    </Layout>
  );
}
