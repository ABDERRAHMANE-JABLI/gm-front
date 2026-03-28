import Layout from '@/components/layout/Layout/Layout';
import RecipesPage from '@/page-components/Recipes/List';
import { Language } from '@/lib/i18n/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Recettes - Gault&Millau',
    description: 'Découvrez les meilleures recettes des chefs sélectionnés par Gault&Millau Maroc',
  };
}

export default async function RecipesPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <Layout language={lang as Language}>
      <RecipesPage lang={lang as Language} />
    </Layout>
  );
}
