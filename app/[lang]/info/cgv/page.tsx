import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import CGVPage from '@/page-components/Info/CGVPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Terms of Sale' : 'Conditions Générales de Vente',
    description: lang === 'en'
      ? "Terms of Sale of the Gault&Millau Morocco store: orders, payment, delivery and returns for our distinction plaques."
      : "Conditions Générales de Vente de la boutique Gault&Millau Maroc : commandes, paiement, livraison et retours des plaques de distinction.",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <CGVPage lang={lang} />
    </Layout>
  );
}
