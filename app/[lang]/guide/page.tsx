import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import GuideMarocPage from '@/page-components/guide/guide-maroc';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'The Guide | Gault&Millau Morocco' : 'Le Guide | Gault&Millau Maroc',
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
