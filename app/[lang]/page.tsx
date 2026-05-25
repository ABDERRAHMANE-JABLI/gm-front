import { Suspense } from 'react';
import Layout from "@/components/layout/Layout/Layout";
import HomePage from "@/page-components/HomePage/HomePage";
import { Language } from "@/lib/i18n";
import { fetchHomeSections } from "@/lib/api/home";
import { fetchPartners } from "@/lib/api/partners";
import CardsSkeleton from "@/components/ui/CardsSkeleton";

export const revalidate = 86400;

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
