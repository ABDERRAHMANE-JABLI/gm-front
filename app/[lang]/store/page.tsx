import type { Metadata } from 'next';
import StoreLayout from '@/components/layout/StoreLayout';
import StorePage from '@/page-components/Store/StorePage';
import { CartProvider } from '@/lib/context/CartContext';

const DESCRIPTIONS: Record<string, string> = {
  fr: "Commandez vos plaques de distinction Gault&Millau Maroc et valorisez votre établissement.",
  en: "Order your Gault&Millau Morocco distinction plaques and showcase your establishment.",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'fr'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
  const description = DESCRIPTIONS[lang]

  return {
    title: "Boutique | Plaques Gault&Millau Maroc",
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/store`,
      languages: { fr: `${siteUrl}/fr/store`, en: `${siteUrl}/en/store` },
    },
    openGraph: {
      title: "Boutique Gault&Millau Maroc",
      description,
      url: `${siteUrl}/${lang}/store`,
      siteName: "Gault&Millau Maroc",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: "Boutique Gault&Millau Maroc", description },
  }
}

export default async function StorePageRoute({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'en' ? 'en' : 'fr';

  return (
    <CartProvider>
      <StoreLayout lang={lang}>
        <StorePage />
      </StoreLayout>
    </CartProvider>
  );
}
