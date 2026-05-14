import Layout from "@/components/layout/Layout/Layout";
import HomePage from "@/page-components/HomePage/HomePage";
import { Language } from "@/lib/i18n";
import { fetchHomeSections } from "@/lib/api/home";
import { fetchPartners } from "@/lib/api/partners";

export const dynamic = 'force-dynamic';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  const [data, partners] = await Promise.all([
    fetchHomeSections(),
    fetchPartners(),
  ]);

  return (
    <Layout language={language}>
      <HomePage lang={language} data={data} partners={partners} />
    </Layout>
  );
}
