import Layout from '@/components/layout/Layout/Layout';
import RiyadsPage from '@/page-components/Riyads/List';
import { Language } from '@/lib/i18n/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Riyads - Gault&Millau',
    description: 'Découvrez les plus beaux riyads sélectionnés par Gault&Millau Maroc',
  };
}

export default async function RiyadsPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <Layout language={language}>
      <RiyadsPage lang={language} />
    </Layout>
  );
}
