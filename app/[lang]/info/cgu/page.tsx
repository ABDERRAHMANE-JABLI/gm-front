import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import CGUPage from '@/page-components/Info/CGUPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Terms of Use | Gault&Millau Morocco' : "Conditions Générales d'Utilisation | Gault&Millau Maroc",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <CGUPage lang={lang} />
    </Layout>
  );
}
