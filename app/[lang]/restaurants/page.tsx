import Layout from "@/components/layout/Layout/Layout";
import RestaurantsPage from "@/page-components/Restaurants/List";
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

  return (
    <Layout language={language}>
      <RestaurantsPage lang={language} />
    </Layout>
  );
}
