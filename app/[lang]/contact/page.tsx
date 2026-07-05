import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout/Layout';
import ContactPage from '@/page-components/Contact/ContactPage';
import { Language } from '@/lib/i18n/types';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma';
  const isEn = lang === 'en';
  return {
    title: isEn ? 'Become a partner | Gault&Millau Maroc' : 'Devenir partenaire | Gault&Millau Maroc',
    description: isEn
      ? 'Contact Gault&Millau Morocco to become a partner.'
      : 'Contactez Gault&Millau Maroc pour devenir partenaire.',
    alternates: {
      canonical: `${siteUrl}/${lang}/contact`,
      languages: { fr: `${siteUrl}/fr/contact`, en: `${siteUrl}/en/contact` },
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const language = lang as Language;
  return (
    <Layout language={language}>
      <ContactPage lang={language} />
    </Layout>
  );
}
