import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import BlogsContent from "@/page-components/Blogs/List/BlogsContent";
import { fetchArticles, fetchArticleFilters } from "@/lib/api/articles";
import { Language } from "@/lib/i18n/types";
import CardsSkeleton from "@/components/ui/CardsSkeleton";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Actualités - Gault&Millau',
    description: 'Découvrez les actualités et articles sur la gastronomie marocaine',
  };
}

async function BlogsData({ lang }: { lang: Language }) {
  const [{ articles, pagination }, themes] = await Promise.all([
    fetchArticles({ page: 1, limit: 9 }),
    fetchArticleFilters(),
  ]);
  return (
    <BlogsContent
      lang={lang}
      initialArticles={articles}
      initialPagination={pagination}
      themes={themes}
    />
  );
}

export default async function BlogsPageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={9} />}>
        <BlogsData lang={language} />
      </Suspense>
    </Layout>
  );
}
