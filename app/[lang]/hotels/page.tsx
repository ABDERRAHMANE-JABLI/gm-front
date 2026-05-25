import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import HotelsContent from "@/page-components/Hotels/List/HotelsContent";
import { fetchHotels, fetchHotelFilters } from "@/lib/api/hotels";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hôtels - Gault&Millau',
    description: 'Découvrez les plus beaux hôtels sélectionnés par Gault&Millau Maroc',
  };
}

async function HotelsData({ lang }: { lang: Language }) {
  const [{ hotels, pagination }, filters] = await Promise.all([
    fetchHotels({ page: 1, limit: 9 }),
    fetchHotelFilters(),
  ]);
  return (
    <HotelsContent
      lang={lang}
      initialHotels={hotels}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

export default async function HotelsPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <HotelsData lang={language} />
      </Suspense>
    </Layout>
  );
}
