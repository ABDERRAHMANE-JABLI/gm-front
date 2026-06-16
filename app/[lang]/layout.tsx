import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';

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
    <html lang={lang}>
      <body>
        <NextTopLoader color="#ffeb00" shadow="0 0 10px #ffeb00" height={3} showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
