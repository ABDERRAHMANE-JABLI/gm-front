import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PeoplesPage from '@/page-components/PeoplesPage';

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
    fr: 'Recherche de personnalités - Gault&Millau',
    en: 'People search - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les plus grandes personnalités de la gastronomie : chefs étoilés, critiques culinaires, sommeliers et acteurs de l\'art de vivre.',
    en: 'Discover the greatest personalities in gastronomy: starred chefs, culinary critics, sommeliers and lifestyle figures.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function PeopleSearchPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <PeoplesPage lang={lang} />;
}
