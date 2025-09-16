import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WineriesPage from '@/page-components/Wineries/List';

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
    fr: 'Recherche de domaines viticoles - Gault&Millau',
    en: 'Winery search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les plus beaux domaines viticoles sélectionnés par Gault&Millau. Vignobles, châteaux et propriétés d\'exception.',
    en: 'Discover the most beautiful wineries selected by Gault&Millau. Vineyards, châteaux and exceptional estates.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function WinerySearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <WineriesPage lang={lang} />;
}
