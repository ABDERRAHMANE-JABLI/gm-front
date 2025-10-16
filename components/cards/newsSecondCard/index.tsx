"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardButtonProps, NewsCardProps } from "@/types/News";
import styles from "./newsSecondCard.module.css";
import { hrefCard, hrefButton, defaultLabelByKind } from "@/utils/NewsCardLink";
import { useClientTranslation } from '@/lib/i18n/client';
import NewsIcon from "@/public/icons/menu/blog.svg";


type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  news: NewsCardProps;
};

export default function NewsSecondCard({ lang, news}: Props) {
  const cardHref = hrefCard(lang, news.slug);
  const { t } = useClientTranslation(lang);
  const buttons = news.buttons ?? [];
  const showMainButton = buttons.length === 0;

  return (
    <article className={`${styles["uneDeux-card"]} d-none d-lg-flex`}>
      <Link href={cardHref} aria-label={`${news.title} — ${t('common.read_more')}`}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>
      <div className={styles["place-card-header"]}>
        <div className={styles.iconWrapper}>
          <NewsIcon width={28} height={28}/>
        </div>
        <div className={styles["place-card-header-title"]}>
          <span className={`${styles.title} ${styles.ellipsis}`}>{t('navigation.actualites')}</span>
          <span className={`${styles.subTitle} ${styles.ellipsis}`}>
            {news.theme?.[0]}
          </span>
        </div>

        <Link href={`/${lang}/blogs/`} className={styles["figma-placeCardButton"]}>
          <span className={`text-uppercase ${styles.ellipsis}`}>{t('common.see_more')}</span>
        </Link>
      </div>

      <div className={styles["thumbnail-wrapper"]}>
        <SmartImage
          id={news.thumbId}
          alt={news.title}
          width={648}
          height={400}
          fit="cover"
          lazyload
        />
        {
          news.theme?.[0] && (
          <div className={styles.themeTagWrapper}>
          <span className={styles.ellipsis}>{news.theme?.[0]}</span>
        </div>)
        }
      </div>

      <div className={`${styles.cardPaddingContainer} ${styles.titleContainer}`}>
        <span className={`${styles["card-title"]} ${styles.center} ${styles["clamp-2"]}`}>
          {news.title}
        </span>
      </div>

      <div className={`${styles.cardPaddingContainer} ${styles.resumeContainer}`}>
        <span className={`${buttons.length > 1 ? styles.resumTwoLines : styles.resumFourLines}`}>
          {news.resume}
        </span>
      </div>

      <div className={`${styles.cardPaddingContainer} ${styles.buttonsContainer}`}>
        {buttons.length > 0 ? (
            <div className={styles.captionButtons}>
              {buttons.map((btn, idx) => (
                <CaptionButton key={idx} lang={lang} data={btn} />
              ))}
            </div>
          ) : (
            showMainButton && (
              <Link href={cardHref} className={styles["figma-cardButton"]} title={news.title}>
                <span className={`text-uppercase ${styles.ellipsis}`}>{t('common.read_more')}</span>
              </Link>
            )
          )}
      </div>
    </article>
  );
}


function CaptionButton({ lang, data }: { lang: string; data: NewsCardButtonProps }) {
  const label = data.label ?? defaultLabelByKind[data.buttonKind];
  const url = hrefButton(lang, data.buttonKind, data.slug);

  return (
    <Link href={url} className={styles["figma-cardButton"]}>
      <span className={styles.captionLabel}>{label}</span>
      <span className={styles.captionText}>
        <strong className={styles.captionLine1}>{data.text_line1}</strong>
        {data.text_line2 && <span className={styles.captionLine2}>{data.text_line2}</span>}
      </span>
      <span className={styles.chevron} aria-hidden>
        <svg width="12px" height="12px" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708"></path></svg>
      </span>
    </Link>
  );
}
