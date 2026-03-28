import Layout from "@/components/layout/Layout/Layout";
import BlogsContent from "@/page-components/Blogs/List/BlogsContent";
import { fetchArticles, fetchArticleFilters } from "@/lib/api/articles";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Actualités - Gault&Millau',
    description: 'Recherchez dans nos actualités et articles sur la gastronomie française',
  };
}

export default async function BlogsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [{ articles, pagination }, themes] = await Promise.all([
    fetchArticles({ page: 1, limit: 9 }),
    fetchArticleFilters(),
  ]);

  return (
    <Layout language={language}>
      <BlogsContent
        lang={language}
        initialArticles={articles}
        initialPagination={pagination}
        themes={themes}
      />
    </Layout>
  );
}
