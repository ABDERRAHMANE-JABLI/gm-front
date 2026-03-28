import Layout from "@/components/layout/Layout/Layout";
import RestaurantsContent from "@/page-components/Restaurants/List/RestaurantsContent";
import { fetchRestaurants, fetchRestaurantFilters } from "@/lib/api/restaurants";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Restaurants - Gault&Millau',
    description: 'Découvrez les meilleurs restaurants sélectionnés par Gault&Millau Maroc',
  };
}

export default async function RestaurantsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ restaurants, pagination }, filters] = await Promise.all([
    fetchRestaurants({ page: 1, limit: 9 }),
    fetchRestaurantFilters(),
  ]);

  return (
    <Layout language={language}>
      <RestaurantsContent
        lang={language}
        initialRestaurants={restaurants}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
