import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout/Layout';
import UtensilsPage from '@/page-components/UtensilsPage';
import { Language } from '@/lib/i18n/types';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:       lang === 'fr' ? 'Ustensiles - Gault&Millau' : 'Utensils - Gault&Millau',
    description: lang === 'fr'
      ? 'Découvrez les collections d\'ustensiles recommandées par Gault&Millau.'
      : 'Discover utensil collections recommended by Gault&Millau.',
  };
}

export default async function UtensilsPageRoute({ params }: PageProps) {
  const { lang } = await params;
  if (!['fr', 'en'].includes(lang)) notFound();
  const language = lang as Language;

  return (
    <Layout language={language}>
      <UtensilsPage lang={language} />
    </Layout>
  );
}
