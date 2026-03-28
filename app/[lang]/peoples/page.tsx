import Layout from '@/components/layout/Layout/Layout';
import PeoplesPage from '@/page-components/People/List';
import { Language } from '@/lib/i18n/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Talents - Gault&Millau',
    description: 'Découvrez les chefs et talents sélectionnés par Gault&Millau Maroc',
  };
}

export default async function PeoplesPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <Layout language={lang as Language}>
      <PeoplesPage lang={lang as Language} />
    </Layout>
  );
}
