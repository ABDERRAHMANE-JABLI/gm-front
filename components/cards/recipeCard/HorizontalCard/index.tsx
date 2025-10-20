"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./horizontalRecipe.module.css";
import { RecipeCardProps, RecipeCardButtonProps, RecipeCardButtonKind } from "@/types/Recipe";
import Toques from "../../common/Toques";
import { hrefButtonRecipe, hrefCardRecipe } from "../hrefRecipeButton";
import { useClientTranslation } from '@/lib/i18n/client';


type Language = "fr" | "en";

type Props = {
  lang: Language;
  recipe: RecipeCardProps;
};

export default function HorizontalRecipeCard({ lang, recipe }: Props) {
  //figma-cardButton
  const imageId = recipe?.thumbId ?? "";
  const nbToques = recipe.rating?.nbToques ?? 7;
  const cardHref = hrefCardRecipe(lang, recipe.slug);
  const isSinglePeople = recipe.buttons.length === 1 && recipe.buttons[0].buttonKind === RecipeCardButtonKind.PEOPLE;
  const { t } = useClientTranslation(lang);

  return (
    <div className={`${styles["cardkind-horizontal-empty"]} ${styles["cardkind-horizontal-blog"]}`}>
      <Link href={`/${lang}/Recipe/${recipe?.slug}`} aria-label={recipe.title} title={recipe.title}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>
      <div className={styles["thumbnail-wrapper"]}>
        <SmartImage id={imageId} alt={recipe.title} width={400} height={270} fit="cover" lazyload/>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.divToques}>
          <Toques nbToques={nbToques} description={recipe.rating?.noteDescription} note={recipe.rating?.note}/>
        </div>

        <div className={`${styles["title-container"]}`}>
          <span className={`${styles["card-title"]} ${styles.horizontal}`}>
            {recipe.title}
          </span>
        </div>

        <div className={`${styles["horizontal-container"]}`}>
          <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
            <div className={`${styles.resumeContent} ${recipe.buttons.length > 1 ? styles.resumTwoLines : styles.resumFourLines}`}>
              {recipe.resume}
            </div>
          </div>
          <div className={`${styles["button-container"]}`}>
            {recipe.buttons.length > 0 ? (
            <div className={styles.captionButtons}>
              {recipe.buttons.map((btn, idx) => (
                <CaptionButton key={idx} lang={lang} data={btn} hideLabel={isSinglePeople}/>
              ))}
            </div>
          ) : (
              <Link href={cardHref} className={`${styles.MainButton} ${styles.horizontal}`} aria-label={recipe.title} title={recipe.title}>
                <span className={styles.MainButtonText}>
                  {t('common.read_more')}
                </span>
              </Link>
            )
          }
          </div>
        </div>
      </div>
    </div>
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
