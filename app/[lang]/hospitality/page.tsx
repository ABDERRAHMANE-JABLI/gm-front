import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import HospitalityPage from '@/page-components/guide/hospitality';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Hospitality | Gault&Millau Morocco' : 'Hospitalité | Gault&Millau Maroc',
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
