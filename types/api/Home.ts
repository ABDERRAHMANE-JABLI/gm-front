export type HomeSectionLayoutType =
  | 'article_full'
  | 'articles_split'
  | 'pub_full'
  | 'article_pub'
  | 'three_articles';

export interface HomeSectionItem {
  type:    string;
  id:      number;
  title:   string;
  slug:    string;
  thumbId: string | null;
}

export interface HomeSection {
  id:         number;
  position:   number;
  layoutType: HomeSectionLayoutType;
  pubThumbId: string | null;
  pubLink:    string | null;
  main:       HomeSectionItem | null;
  secondary:  HomeSectionItem | null;
  tertiary:   HomeSectionItem | null;
}

export interface HomeRecipe {
  title:      string;
  slug:       string;
  thumbId:    string | null;
  resume:     string;
  typeRecipe: string | null;
  difficulty: string | null;
  chef:       { fullName: string; slug: string } | null;
  restaurant: { name: string; slug: string; lieu: string } | null;
}

export interface HomeBanner {
  bgImageId: string | null;
  url:       string;
}

export interface HomeApiResponse {
  sections:      HomeSection[];
  latestRecipes: HomeRecipe[];
  banner:        HomeBanner;
}
