import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import PolitiqueConfidentialitePage from '@/page-components/Info/PolitiqueConfidentialitePage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Privacy Policy' : 'Politique de confidentialité',
    description: lang === 'en'
      ? "Gault&Millau Morocco privacy policy: what personal data we collect, why, and how we protect it."
      : "Politique de confidentialité de Gault&Millau Maroc : quelles données personnelles nous collectons, pourquoi et comment nous les protégeons.",
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <PolitiqueConfidentialitePage lang={lang} />
    </Layout>
  );
}
