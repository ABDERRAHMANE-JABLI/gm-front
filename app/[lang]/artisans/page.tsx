import Layout from '@/components/layout/Layout/Layout';
import ArtisansPage from '@/page-components/Artisans/List';
import { Language } from '@/lib/i18n/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Artisans - Gault&Millau',
    description: 'Découvrez les meilleurs artisans sélectionnés par Gault&Millau Maroc',
  };
}

export default async function ArtisansPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <Layout language={lang as Language}>
      <ArtisansPage lang={lang as Language} />
    </Layout>
  );
}
