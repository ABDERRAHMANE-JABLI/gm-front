import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import HospitalityPage from '@/page-components/guide/hospitality';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Hospitality' : 'Hospitalité',
    description: lang === 'en'
      ? "Hospitality according to Gault&Millau Morocco: our vision of welcome, service and the art of hosting in Moroccan gastronomy."
      : "L'hospitalité selon Gault&Millau Maroc : notre vision de l'accueil, du service et de l'art de recevoir dans la gastronomie marocaine.",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <HospitalityPage lang={lang} />
    </Layout>
  );
}
