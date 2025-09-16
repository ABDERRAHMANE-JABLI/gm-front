import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WinesPage from '@/page-components/Wines/List';

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
    fr: 'Recherche de vins - Gault&Millau',
    en: 'Wine search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleurs vins sélectionnés par Gault&Millau. Recherchez par région, cépage, millésime et plus encore.',
    en: 'Discover the best wines selected by Gault&Millau. Search by region, grape variety, vintage and more.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function WineSearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <WinesPage lang={lang} />;
}
