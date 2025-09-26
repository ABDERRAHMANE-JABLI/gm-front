import { NewsCardButtonKind } from "@/types/News";

export const rootByKind: Record<NewsCardButtonKind, string> = {
  [NewsCardButtonKind.ARTISAN]: "artisans",
  [NewsCardButtonKind.HOTEL]: "hotels",
  [NewsCardButtonKind.PEOPLE]: "peoples",
  [NewsCardButtonKind.RESTAURANT]: "restaurant",
  [NewsCardButtonKind.WINERY]: "wineries",
};

export const defaultLabelByKind: Record<NewsCardButtonKind, string> = {
  [NewsCardButtonKind.ARTISAN]: "Artisan",
  [NewsCardButtonKind.HOTEL]: "Hôtel",
  [NewsCardButtonKind.PEOPLE]: "Chef",
  [NewsCardButtonKind.RESTAURANT]: "Restaurant",
  [NewsCardButtonKind.WINERY]: "Vigneron",
};

export const hrefCard = (lang: string, cardSlug: string) =>
  `/${lang}/blogs/${cardSlug}`;

export const hrefButton = (lang: string, kind: NewsCardButtonKind, slug: string) =>
  `/${lang}/${rootByKind[kind]}/${slug}`;


