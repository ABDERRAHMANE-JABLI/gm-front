import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import ArtisansContent from "@/page-components/Artisans/List/ArtisansContent";
import { fetchArtisans, fetchArtisanFilters } from "@/lib/api/artisans";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Artisans - Gault&Millau',
    description: 'Découvrez les meilleurs artisans sélectionnés par Gault&Millau Maroc',
  };
}

async function ArtisansData({ lang }: { lang: Language }) {
  const [{ artisans, pagination }, filters] = await Promise.all([
    fetchArtisans({ page: 1, limit: 9 }),
    fetchArtisanFilters(),
  ]);
  return (
    <ArtisansContent
      lang={lang}
      initialArtisans={artisans}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

export default async function ArtisansPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <ArtisansData lang={language} />
      </Suspense>
    </Layout>
  );
}
