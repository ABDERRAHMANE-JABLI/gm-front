export type AwardCategory = 'guide' | 'plaques' | 'magazines';

export type AwardSubcategory =
  | 'hotel'
  | 'riyad'
  | 'artisan'
  | 'domaine'
  | 'table-chef'
  | 'table-gourmande'
  | 'prestige'
  | 'remarquable';

export interface Award {
  id: string;
  title: string;
  ref?: string;
  price: number;
  thumbUrl?: string;
  category: AwardCategory;
  subcategory?: AwardSubcategory;
}

export interface CartItem {
  award: Award;
  quantity: number;
}
