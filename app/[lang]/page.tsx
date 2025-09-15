import Layout from "@/components/layout/Layout/Layout";
import HomePage from "@/page-components/HomePage/HomePage";
import { Language, getTranslation } from "@/lib/i18n";
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
  const language = lang as Language;
  
  return {
    title: "Gault&Millau",
    description: getTranslation('home.hero.subtitle', language),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;
  
  return (
    <Layout language={language}>
      <HomePage lang={language} />
    </Layout>
  );
}
