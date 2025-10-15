"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardProps } from "@/types/News";
import { hrefCard } from "@/lib/NewsCard";
import styles from "./newsSecondCard.module.css";
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
        <span className={`${styles["clamp-3"]}`}>
          {news.resume}
        </span>
      </div>

      <div className={`${styles.cardPaddingContainer} ${styles.buttonsContainer}`}>
        <Link href={cardHref} className={styles["figma-cardButton"]} title={news.title}>
          <span className={`text-uppercase ${styles.ellipsis}`}>{t('common.read_more')}</span>
        </Link>
      </div>
    </article>
  );
}
