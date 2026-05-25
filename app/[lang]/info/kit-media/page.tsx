import { Metadata } from 'next';
import { Language } from '@/lib/types';
import Layout from '@/components/layout/Layout/Layout';
import KitMediaPage from '@/page-components/Info/KitMediaPage';

interface Props { params: Promise<{ lang: Language }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Media Kit | Gault&Millau Morocco' : 'Kit Média | Gault&Millau Maroc',
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return (
    <Layout language={lang}>
      <KitMediaPage lang={lang} />
    </Layout>
  );
}
