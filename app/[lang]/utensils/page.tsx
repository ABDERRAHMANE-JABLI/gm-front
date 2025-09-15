import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UtensilsPage from '@/page-components/UtensilsPage';

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
    fr: 'Ustensiles de cuisine - Gault&Millau',
    en: 'Kitchen utensils - Gault&Millau'
  };

  const descriptions = {
    fr: 'Découvrez les meilleurs ustensiles et équipements de cuisine professionnels recommandés par Gault&Millau. L\'art culinaire commence par les bons outils.',
    en: 'Discover the best professional kitchen utensils and equipment recommended by Gault&Millau. Culinary art begins with the right tools.'
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function UtensilsPageRoute({ params }: PageProps) {
  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  return <UtensilsPage lang={lang} />;
}
