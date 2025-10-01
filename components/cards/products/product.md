#  BaseComponent

---

## Structure du composant

Le composant Générique `BaseComponent` gère l’affichage de la structure commune (title, image, note), il prend comme parametres tous les attributs communs entre les différents produits (wine, rum, champagne ...) comme `brand, title, note, thumbId, hrefProduct` plus un autre attribut `typeProduct` (pour definir le type de produit : wine, rum, champagne) et un enfant `children` pour redefinir le details dans chaque produit.

```tsx

type Props = {
    brand: string;
    title: string;
    note: string;
    typeProduct: string;
    thumbId?: string;
    hrefProduct: string;
    children: React.ReactNode
};
```

## Exemple d'utilisation du BaseComponent dans le composant WineCard.tsx

```tsx
export default function WineCardComponent({ lang, WineProduct }: Props) {

  const { t } = useClientTranslation(lang);

  return (
    <BaseComponent
      brand={WineProduct.brand}
      title={WineProduct.title}
      note={WineProduct.note ?? ""}
      typeProduct={t('products.wine')}
      thumbId={WineProduct.thumbId}
      hrefProduct={`/${lang}/wineries/${WineProduct.domainSlug}/${WineProduct.slug}`}>

      <div className={styles.details}>
        {
          WineProduct.vintage && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.vintage")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WineProduct.vintage}
              </span>
            </div> 
          )
        }
        {
          WineProduct.appellation && (
            <div className={styles.cardDetailVer}>
              <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
                {t("libelle.appellation")} :
              </span>
              <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
                {WineProduct.appellation}
              </span>
            </div>
          )
        }
        {WineProduct.colorCode && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.color")} :
            </span>
            <div className={styles.colors}>
                <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>{WineProduct.colorCode}</span>
                <div className={styles.figmaColor}>
                    <svg width="15px" height="15px" viewBox="0 0 100 100" fill={getColorHex(WineProduct.colorCode)} stroke="#B5B5B5" stroke-width="5px" aria-hidden="true"><circle cx="50" cy="50" r="40"></circle></svg>
                </div>
            </div>
          </div>
        )}
        
        {WineProduct.varieties && (
          <div className={styles.cardDetailVer}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.varieties")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles["clamp-2"]} ${styles.sm}`}>
              {Object.entries(WineProduct.varieties || {}).map(([key, value]) => `${key} ${value}%`).join(" ")}
            </span>
          </div>
        )}
        {WineProduct.priceRange && (
          <div className={`${styles.cardDetailVer} ${styles.mtAuto}`}>
            <span className={`${styles.figmaCaption} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {t("libelle.priceRange")} :
            </span>
            <span className={`${styles.figmaCaptionValue} ${styles.vertical} ${styles.ellipsis} ${styles.sm}`}>
              {WineProduct.priceRange}
            </span>
          </div>
        )}
      </div>

    </BaseComponent>
  );
}
```
---

## Fonctions utilitaires

### `getColorHex(WineProduct.colorCode)`

Cette fonction permet de récupérer le code couleur hexadécimal associé à la couleur d’un produit.

```tsx
export const COLOR_HEX_MAP: Record<ColorCode, string> = {
    'Ambré': '#FFB701',
    'Rouge': '#CC292B',
    'Rosé': '#FFACAC',
    'Effervescent rosé': '#FFACAC',
    'Effervescent rosé de saignée': '#FFACAC',
    'Orange': '#F58331',
    'Blanc': '#F2EB8F',
    'Effervescent blanc': '#F2EB8F',
    'blanc effervescent': '#F2EB8F',
    'nonWoodAged': '#F8F8FF',
    'woodAged': '#8B5A2B',
};

export function getColorHex(colorCode: ColorCode): string {
  return COLOR_HEX_MAP[colorCode];
}
```
---

### Exemple de L'objet WineData

```tsx
import WineCardProps from "@/types/product/wine";

export const WineData: WineCardProps[] = [
  {
    slug: "domaine-de-chatenoy-clos-des-treilles",
    domainSlug: "domaine-de-chatenoy",
    brand: "Domaine de Châtenoy",
    title: "Clos des Treilles",
    note: "94",
    thumbId: "b974cfb4-6a7f-48eb-ae8c-86b184704a09",
    featured: false,
    vintage: "2022",
    appellation: ["Loire", "Menetou-Salon"],
    colorCode: "Blanc",
    varieties: { "Sauvignon blanc": 100 },
    priceRange: "15€ à 30€",
  },
  ... etc
];
```
### Exemple d'utilisation

```tsx
{WineData.map((data, i) => (
    <WineCardComponent lang={lang} WineProduct={data} key={i} />
))}
```

---

## Localisation des fichiers

* Composant : `@/components/cards/products/baseComponent.tsx`
* CSS module : `@/components/cards/products/base.module.css`
* Types : `@/types/Product/ProductName.ts`
* Fonctions utilitaires : `@/Utils/getColor.ts` 

---
