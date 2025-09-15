import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ChampagnesPage from '@/page-components/ChampagnesPage';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    lang: 'fr' | 'en';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    fr: 'Recherche de champagnes - Gault&Millau',
    en: 'Champagne search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleurs champagnes sélectionnés par Gault&Millau. Recherchez par maison, cuvée, millésime et appellation.',
    en: 'Discover the best champagnes selected by Gault&Millau. Search by house, cuvée, vintage and appellation.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function ChampagnesPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <ChampagnesPage lang={lang} />;
}
