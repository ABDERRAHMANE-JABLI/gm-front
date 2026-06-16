import { Suspense } from 'react';
import type { Metadata } from 'next';
import Layout from "@/components/layout/Layout/Layout";
import HomePage from "@/page-components/HomePage/HomePage";
import { Language } from "@/lib/i18n";
import { fetchHomeSections } from "@/lib/api/home";
import { fetchPartners } from "@/lib/api/partners";
import CardsSkeleton from "@/components/ui/CardsSkeleton";

export const revalidate = 86400;

const DESCRIPTIONS: Record<string, string> = {
  fr: "Gault&Millau Maroc, le guide gastronomique de référence. Découvrez les meilleurs restaurants, hôtels, riads, artisans et chefs sélectionnés au Maroc.",
  en: "Gault&Millau Morocco, the reference gourmet guide. Discover the best restaurants, hotels, riads, artisans and chefs selected in Morocco.",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
  const description = DESCRIPTIONS[lang] ?? DESCRIPTIONS.fr

  return {
    title: "Gault&Millau Maroc | Guide gastronomique",
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        fr: `${siteUrl}/fr`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: "Gault&Millau Maroc",
      description,
      url: `${siteUrl}/${lang}`,
      siteName: "Gault&Millau Maroc",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gault&Millau Maroc",
      description,
    },
  }
}

async function HomeData({ lang }: { lang: Language }) {
  const [data, partners] = await Promise.all([
    fetchHomeSections(),
    fetchPartners(),
  ]);
  return <HomePage lang={lang} data={data} partners={partners} />;
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <Suspense fallback={<CardsSkeleton count={6} />}>
        <HomeData lang={language} />
      </Suspense>
    </Layout>
  );
}
