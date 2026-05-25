import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import PolitiqueConfidentialitePage from '@/page-components/Info/PolitiqueConfidentialitePage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Privacy Policy | Gault&Millau Morocco' : 'Politique de confidentialité | Gault&Millau Maroc',
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
