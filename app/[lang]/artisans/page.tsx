import Layout from "@/components/layout/Layout/Layout";
import ArtisansContent from "@/page-components/Artisans/List/ArtisansContent";
import { fetchArtisans, fetchArtisanFilters } from "@/lib/api/artisans";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Artisans - Gault&Millau',
    description: 'Découvrez les meilleurs artisans sélectionnés par Gault&Millau Maroc',
  };
}

export default async function ArtisansPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ artisans, pagination }, filters] = await Promise.all([
    fetchArtisans({ page: 1, limit: 9 }),
    fetchArtisanFilters(),
  ]);

  return (
    <Layout language={language}>
      <ArtisansContent
        lang={language}
        initialArtisans={artisans}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
