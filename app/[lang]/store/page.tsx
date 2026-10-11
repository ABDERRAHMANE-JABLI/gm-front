import type { Metadata } from 'next';
import StoreLayout from '@/components/layout/StoreLayout';
import StorePage from '@/page-components/Store/StorePage';
import { CartProvider } from '@/lib/context/CartContext';
import type { AwardCategory } from '@/types/Store';

// ?category=guide | plaque | magazine (singulier ou pluriel) → section affichée.
// Sans paramètre ou valeur inconnue : plaques (comportement par défaut).
const CATEGORY_PARAMS: Record<string, AwardCategory> = {
  guide: 'guide', guides: 'guide',
  plaque: 'plaques', plaques: 'plaques',
  magazine: 'magazines', magazines: 'magazines',
};

// Titre (le suffixe « | Gault&Millau Maroc » vient du layout) et description SEO
const SEO: Record<'fr' | 'en', { title: string; ogTitle: string; description: string }> = {
  fr: {
    title: 'Boutique : guide, plaques et magazines',
    ogTitle: 'Boutique Gault&Millau Maroc : guide, plaques et magazines',
    description: "Achetez le guide Gault&Millau Maroc, ses magazines et les plaques de distinction officielles pour valoriser votre restaurant, hôtel, riad ou domaine.",
  },
  en: {
    title: 'Shop: guide, plaques and magazines',
    ogTitle: 'Gault&Millau Morocco Shop: guide, plaques and magazines',
    description: 'Buy the Gault&Millau Morocco guide, its magazines and official distinction plaques to showcase your restaurant, hotel, riad or estate.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = rawLang === 'en' ? 'en' : 'fr'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma'
  const { title, ogTitle, description } = SEO[lang]

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/store`,
      languages: { fr: `${siteUrl}/fr/store`, en: `${siteUrl}/en/store` },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `${siteUrl}/${lang}/store`,
      siteName: "Gault&Millau Maroc",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  }
}

export default async function StorePageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'en' ? 'en' : 'fr';
  const { category } = await searchParams;
  // Object.hasOwn : écarte les clés héritées (?category=constructor, __proto__…)
  const key = String(category ?? '').toLowerCase();
  const initialCategory = Object.hasOwn(CATEGORY_PARAMS, key) ? CATEGORY_PARAMS[key] : 'plaques';

  return (
    <CartProvider>
      <StoreLayout lang={lang}>
        <h1 className="sr-only">
          {lang === 'en' ? 'Gault&Millau Morocco Store' : 'Boutique Gault&Millau Maroc'}
        </h1>
        <StorePage initialCategory={initialCategory} />
      </StoreLayout>
    </CartProvider>
  );
}
