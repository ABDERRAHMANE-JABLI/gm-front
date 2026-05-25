import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import RiyadsContent from "@/page-components/Riyads/List/RiyadsContent";
import { fetchRiyads, fetchRiyadFilters } from "@/lib/api/riyads";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Riyads - Gault&Millau',
    description: 'Découvrez les plus beaux riyads sélectionnés par Gault&Millau Maroc',
  };
}

async function RiyadsData({ lang }: { lang: Language }) {
  const [{ riyads, pagination }, filters] = await Promise.all([
    fetchRiyads({ page: 1, limit: 9 }),
    fetchRiyadFilters(),
  ]);
  return (
    <RiyadsContent
      lang={lang}
      initialRiyads={riyads}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

export default async function RiyadsPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <RiyadsData lang={language} />
      </Suspense>
    </Layout>
  );
}
