import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import MotDuPresidentPage from '@/page-components/Info/MotDuPresidentPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? "President's Message" : 'Mot du Président',
    description: lang === 'en'
      ? "A word from the President of Gault&Millau Morocco: the guide's vision and ambitions for Moroccan gastronomy."
      : "Le mot du Président de Gault&Millau Maroc : la vision et les ambitions du guide pour la gastronomie marocaine.",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <MotDuPresidentPage lang={lang} />
    </Layout>
  );
}
