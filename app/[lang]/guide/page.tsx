import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import GuideMarocPage from '@/page-components/guide/guide-maroc';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'The Guide' : 'Le Guide',
    description: lang === 'en'
      ? "Discover The Gault&Millau Morocco Guide: our rating method, the toques and the selection of the Kingdom's finest tables, hotels and artisans."
      : "Découvrez Le Guide Gault&Millau Maroc : notre méthode de notation, les toques et la sélection des meilleures tables, hôtels et artisans du Royaume.",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <GuideMarocPage lang={lang} />
    </Layout>
  );
}
