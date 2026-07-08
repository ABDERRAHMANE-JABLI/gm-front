import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { GoogleTagManager } from '@next/third-parties/google';
import NavigationCursor from '@/components/ui/NavigationCursor';
import CookieConsent from '@/components/ui/CookieConsent';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.gaultmillau.ma';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Gault&Millau Maroc",
    template: "%s | Gault&Millau Maroc",
  },
  description: "Le guide gastronomique de référence au Maroc. Restaurants, hôtels, chefs et artisans sélectionnés par Gault&Millau.",
  openGraph: {
    siteName: "Gault&Millau Maroc",
    type: "website",
    locale: "fr_MA",
    images: [
      {
        url: "/images/image_seo.png",
        width: 1200,
        height: 630,
        alt: "Gault&Millau Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Token fourni par Google Search Console (défini dans .env)
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    // suppressHydrationWarning : des extensions (Tag Assistant, dark mode…) ajoutent
    // des attributs sur <html>/<body> avant l'hydratation → faux avertissement inoffensif
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* GTM : script principal + fallback sans JavaScript */}
        {GTM_ID && (
          <>
            <GoogleTagManager gtmId={GTM_ID} />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        <NextTopLoader color="#ffeb00" shadow="0 0 10px #ffeb00" height={3} showSpinner={false} />
        <NavigationCursor />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
