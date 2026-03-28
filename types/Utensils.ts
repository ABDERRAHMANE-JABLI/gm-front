// Collection (from /api/ustensils)
export interface UtensilProps {
  title:    string;
  slug:     string;
  thumbId?: string;
}

// Individual utensil (from /api/ustensils/:slug)
export interface UtensilItemProps {
  title:       string;
  slug:        string;
  thumbId?:    string;
  code?:       string;
  description?: string;
}
