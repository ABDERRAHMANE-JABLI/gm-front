import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import CGUPage from '@/page-components/Info/CGUPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Terms of Use' : "Conditions Générales d'Utilisation",
    description: lang === 'en'
      ? "Terms of Use of the Gault&Millau Morocco website: rules for accessing and using our online services."
      : "Conditions Générales d'Utilisation du site Gault&Millau Maroc : règles d'accès et d'usage de nos services en ligne.",
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
