import Layout from "@/components/layout/Layout/Layout";
import PeoplesContent from "@/page-components/People/List/PeoplesContent";
import { fetchTalents, fetchTalentFilters } from "@/lib/api/talents";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Talents - Gault&Millau',
    description: 'Découvrez les chefs et talents sélectionnés par Gault&Millau Maroc',
  };
}

export default async function PeoplesPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ talents, pagination }, filters] = await Promise.all([
    fetchTalents({ page: 1, limit: 9 }),
    fetchTalentFilters(),
  ]);

  return (
    <Layout language={language}>
      <PeoplesContent
        lang={language}
        initialTalents={talents}
        initialPagination={pagination}
        filters={filters}
      />
    </Layout>
  );
}
