import Layout from "@/components/layout/Layout/Layout";
import HotelsContent from "@/page-components/Hotels/List/HotelsContent";
import { fetchHotels, fetchHotelFilters } from "@/lib/api/hotels";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hôtels - Gault&Millau',
    description: 'Découvrez les plus beaux hôtels sélectionnés par Gault&Millau Maroc',
  };
}

export default async function HotelsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ hotels, pagination }, filters] = await Promise.all([
    fetchHotels({ page: 1, limit: 9 }),
    fetchHotelFilters(),
  ]);

  return (
    <Layout language={language}>
      <HotelsContent
        lang={language}
        initialHotels={hotels}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
