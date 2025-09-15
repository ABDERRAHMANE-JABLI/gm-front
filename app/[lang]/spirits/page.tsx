import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SpiritsPage from '@/page-components/SpiritsPage';

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
    fr: 'Recherche de spiritueux - Gault&Millau',
    en: 'Spirits search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleurs spiritueux sélectionnés par Gault&Millau. Whisky, cognac, rhum, gin et plus encore.',
    en: 'Discover the best spirits selected by Gault&Millau. Whisky, cognac, rum, gin and more.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function SpiritSearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <SpiritsPage lang={lang} />;
}
