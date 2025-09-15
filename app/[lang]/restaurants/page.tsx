import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RestaurantsPage from '@/page-components/RestaurantsPage';

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
    fr: 'Recherche de restaurants - Gault&Millau',
    en: 'Restaurant search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Trouvez les meilleurs restaurants près de chez vous avec Gault&Millau. Recherchez par cuisine, localisation, note et plus encore.',
    en: 'Find the best restaurants near you with Gault&Millau. Search by cuisine, location, rating and more.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function RestaurantSearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <RestaurantsPage lang={lang} />;
}
