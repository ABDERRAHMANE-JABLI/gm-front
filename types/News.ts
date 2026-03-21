
export enum NewsCardButtonKind {
  ARTISAN = "artisan",
  HOTEL = "hotel",
  PEOPLE = "people",
  RESTAURANT = "restaurant",
  WINERY = "winery",
}

export interface NewsCardButtonProps {
  buttonKind: NewsCardButtonKind;
  label?: string;
  text_line1: string;
  text_line2?: string;
  slug: string;
}

export interface NewsCardProps {
  id: string;
  title: string;
  resume: string;
  slug: string;
  theme?: string[];               // on affiche theme?.[0]
  thumbId: string;                
  buttons: [] | [NewsCardButtonProps] | [NewsCardButtonProps, NewsCardButtonProps];
}







