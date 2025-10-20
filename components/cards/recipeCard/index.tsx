"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./recipeCard.module.css";
import { RecipeCardProps, RecipeCardButtonProps, RecipeCardButtonKind } from "@/types/Recipe";
import { useClientTranslation } from "@/lib/i18n/client";
import RecipeIcon from "@/public/icons/menu/recipe.svg";
import CardHeader from "../common/HeaderCard";
import { hrefButtonRecipe, hrefCardRecipe } from "./hrefRecipeButton";

type Language = "fr" | "en";

type Props = {
  lang: Language;
  recipe: RecipeCardProps;
  withHeader?: boolean;
};

export default function RecipeCard({ lang, recipe, withHeader }: Props) {
  const firstTheme = recipe.theme?.[0];
  const buttons = recipe.buttons ?? [];
  const cardHref = hrefCardRecipe(lang, recipe.slug);
  const headerSubtitle = recipe.theme?.[0];
  const { t } = useClientTranslation(lang);

  const isSinglePeople = buttons.length === 1 && buttons[0].buttonKind === RecipeCardButtonKind.PEOPLE;

  return (
    <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ""}`}>
      <Link href={cardHref} aria-label={recipe.title} title={recipe.title}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>

      {withHeader && (
        <CardHeader title={t("common.recipes")} href={`/${lang}/recipes/`} seeMoreLabel={t("common.see_more")} subtitle={headerSubtitle} icon={<RecipeIcon width={28} height={28} />}/>
      )}

      <div className={styles.thumbWrapper}>
        <SmartImage id={recipe.thumbId} alt={recipe.title} width={666} height={444} fit="cover" lazyload/>
        {firstTheme && <span className={styles.badge}>{firstTheme}</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={`${styles.synopsis} ${buttons.length > 1 ? styles.resumTwoLines : styles.resumFourLines}`}>{recipe.resume}</p>

        <div className={styles.footer}>
          {buttons.length > 0 ? (
            <div className={styles.captionButtons}>
              {buttons.map((btn, idx) => (
                <CaptionButton key={idx} lang={lang} data={btn} hideLabel={isSinglePeople}/>
              ))}
            </div>
          ) : (
              <Link href={cardHref} className={styles.MainButton} aria-label={recipe.title} title={recipe.title}>
                <span className={styles.MainButtonText}>
                  {t("common.read_more")}
                </span>
              </Link>
            )
          }
        </div>
      </div>
    </article>
  );
}

function CaptionButton({ lang, data, hideLabel = false,}: {lang: string; data: RecipeCardButtonProps; hideLabel?: boolean}) {
  
  const url = hrefButtonRecipe(lang, data.buttonKind, data.slug);

  return (
    <Link href={url} className={styles.captionBtn}>
      {!hideLabel && (
        <span className={styles.captionLabel}>
          {data.label || data.buttonKind}
        </span>
      )}
      <span className={`${styles.captionText} ${hideLabel ? styles.textCenter : ''}`}>
        <strong className={styles.captionLine1}>{data.text_line1}</strong>
        {data.text_line2 && !hideLabel && <span className={styles.captionLine2}>{data.text_line2}</span>}
      </span>
      <span className={styles.chevron} aria-hidden>
        <svg width="12px" height="12px" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </span>
    </Link>
  );
}
