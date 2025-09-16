import Layout from "@/components/layout/Layout/Layout";
import BlogsPage from "@/page-components/Blogs/List";
import { Language } from "@/lib/i18n/types";
import type { Metadata } from "next";

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

// Generate metadata for each language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: `Actualités - Gault&Millau`,
    description: "Recherchez dans nos actualités et articles sur la gastronomie française",
    alternates: {
      canonical: `/${lang}/search/blog`,
      languages: {
        'fr': '/fr/search/blog',
        'en': '/en/search/blog',
      },
    },
  };
}

export default async function BlogsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;
  
  return (
    <Layout language={language}>
      <BlogsPage lang={language} />
    </Layout>
  );
}
