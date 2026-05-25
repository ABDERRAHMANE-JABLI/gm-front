import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import MotDuPresidentPage from '@/page-components/Info/MotDuPresidentPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? "President's Message | Gault&Millau Morocco" : 'Mot du Président | Gault&Millau Maroc',
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
