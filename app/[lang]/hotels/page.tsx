import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HotelsPage from '@/page-components/HotelsPage';

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
    fr: 'Recherche d\'hôtels - Gault&Millau',
    en: 'Hotel search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les plus beaux hôtels et établissements de luxe sélectionnés par Gault&Millau. Art de vivre et gastronomie.',
    en: 'Discover the most beautiful hotels and luxury establishments selected by Gault&Millau. Art of living and gastronomy.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function HotelsPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <HotelsPage lang={lang} />;
}
