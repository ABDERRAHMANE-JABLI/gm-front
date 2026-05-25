import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import PeoplesContent from "@/page-components/People/List/PeoplesContent";
import { fetchTalents, fetchTalentFilters } from "@/lib/api/talents";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Talents - Gault&Millau',
    description: 'Découvrez les chefs et talents sélectionnés par Gault&Millau Maroc',
  };
}

async function PeoplesData({ lang }: { lang: Language }) {
  const [{ talents, pagination }, filters] = await Promise.all([
    fetchTalents({ page: 1, limit: 9 }),
    fetchTalentFilters(),
  ]);
  return (
    <PeoplesContent
      lang={lang}
      initialTalents={talents}
      initialPagination={pagination}
      filters={filters}
    />
  );
}

export default async function PeoplesPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <PeoplesData lang={language} />
      </Suspense>
    </Layout>
  );
}
