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
  fr: "Gault Millau Maroc, le guide gastronomique de référence : restaurants, hôtels, riads, chefs et artisans du Maroc sélectionnés, notés et recommandés par nos experts.",
  en: "Gault Millau Morocco, the reference gourmet guide: restaurants, hotels, riads, chefs and artisans in Morocco, selected, rated and recommended by our experts.",
}

// Note : Google IGNORE la balise keywords (aucun impact sur le classement).
// Gardée à titre indicatif. Le vrai SEO vient du titre, du contenu et des
// données structurées (JSON-LD ci-dessous).
const KEYWORDS: Record<string, string[]> = {
  fr: [
    "Gault Millau Maroc", "guide gastronomique Maroc", "meilleurs restaurants Maroc",
    "restaurants Maroc", "hôtels Maroc", "riads Maroc", "chefs Maroc", "artisans Maroc",
    "guide restaurants Maroc", "gastronomie marocaine",  "Gault&Millau",
  ],
  en: [
    "Gault Millau Morocco", "gourmet guide Morocco", "best restaurants Morocco",
    "restaurants Morocco", "hotels Morocco", "riads Morocco", "chefs Morocco", "artisans Morocco",
    "restaurant guide Morocco", "Moroccan gastronomy",  "Gault&Millau",
  ],
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
    keywords: KEYWORDS[lang] ?? KEYWORDS.fr,
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma';

  // Données structurées (JSON-LD) : aide Google à comprendre le site → vrai levier SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Gault&Millau Maroc',
        url: `${siteUrl}/${lang}`,
        logo: `${siteUrl}/icon.png`,
        sameAs: [
          'https://www.instagram.com/gaultmillauma',
          'https://www.linkedin.com/company/gault-millau-maroc',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Gault&Millau Maroc',
        url: `${siteUrl}/${lang}`,
        inLanguage: lang,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <Layout language={language}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<CardsSkeleton count={6} />}>
        <HomeData lang={language} />
      </Suspense>
    </Layout>
  );
}
