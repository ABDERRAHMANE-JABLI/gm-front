import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import RestaurantsContent from "@/page-components/Restaurants/List/RestaurantsContent";
import { fetchRestaurants, fetchRestaurantFilters } from "@/lib/api/restaurants";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Restaurants - Gault&Millau',
    description: 'Découvrez les meilleurs restaurants sélectionnés par Gault&Millau Maroc',
  };
}

async function RestaurantsData({ lang }: { lang: Language }) {
  const [{ restaurants, pagination }, filters] = await Promise.all([
    fetchRestaurants({ page: 1, limit: 9 }),
    fetchRestaurantFilters(),
  ]);
  return (
    <RestaurantsContent
      lang={lang}
      initialRestaurants={restaurants}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

export default async function RestaurantsPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <RestaurantsData lang={language} />
      </Suspense>
    </Layout>
  );
}
