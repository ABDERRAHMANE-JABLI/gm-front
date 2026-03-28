import Layout from "@/components/layout/Layout/Layout";
import RiyadsContent from "@/page-components/Riyads/List/RiyadsContent";
import { fetchRiyads, fetchRiyadFilters } from "@/lib/api/riyads";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Riyads - Gault&Millau',
    description: 'Découvrez les plus beaux riyads sélectionnés par Gault&Millau Maroc',
  };
}

export default async function RiyadsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ riyads, pagination }, filters] = await Promise.all([
    fetchRiyads({ page: 1, limit: 9 }),
    fetchRiyadFilters(),
  ]);

  return (
    <Layout language={language}>
      <RiyadsContent
        lang={language}
        initialRiyads={riyads}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
