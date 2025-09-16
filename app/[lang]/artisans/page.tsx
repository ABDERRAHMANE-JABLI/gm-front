import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArtisansPage from '../../../page-components/Artisans/List';

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
    fr: 'Recherche d\'artisans - Gault&Millau',
    en: 'Artisan search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleurs artisans des métiers de bouche sélectionnés par Gault&Millau. Boulangers, pâtissiers, chocolatiers et plus encore.',
    en: 'Discover the best food artisans selected by Gault&Millau. Bakers, pastry chefs, chocolatiers and more.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function ArtisansPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <ArtisansPage lang={lang} />;
}
