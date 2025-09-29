"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardProps } from "@/types/News";
import { hrefCard } from "@/lib/NewsCard";
import styles from "./newsSecondCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';


type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  news: NewsCardProps;
  withHeader?: boolean;
  headerSubtitle?: string;
  headerMoreHref?: string;
};

export default function NewsSecondCard({ lang, news}: Props) {
  const cardHref = hrefCard(lang, news.slug);
  const headerMoreHref = "/" + lang + "/blogs";
  const headerSubtitle = news.theme?.[0];
  const { t } = useClientTranslation(lang);

  return (
    <article className={`${styles["uneDeux-card"]} d-none d-lg-flex`}>
      <Link href={cardHref} aria-label={`${news.title} — ${t('common.read_more')}`}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>
      <div className={styles["place-card-header"]}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64">
            <defs>
                <clipPath id="clip-path">
                    <rect width="28.602" height="27.028" fill="rgba(0,0,0,0.2)" />
                </clipPath>
                <clipPath id="clip-path-2">
                    <rect width="28.602" height="27.028" fill="#ffffffff" />
                </clipPath>
            </defs>
            <g transform="translate(-114.5 -28)">
                <rect width="64" height="64" rx="18" transform="translate(114.5 28)" fill="#fda703" />
                <g transform="translate(130.5 45.052) scale(1.3)">
                    <g transform="translate(1.229 1.229)">
                        <g clipPath="url(#clip-path)">
                            <path
                                d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z"
                                fill="rgba(0,0,0,0.1)" />
                        </g>
                    </g>
                    <g>
                        <g clipPath="url(#clip-path-2)">
                            <path
                                d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894Zm-.894,7.2a1.864,1.864,0,0,1-3.723,0V17.948h3.723Z"
                                fill="#fff" />
                            <path
                                d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z"
                                fill="#fff" />
                        </g>
                    </g>
                    <path
                        d="M16.617,5.477a.893.893,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,1,1,0-1.787H15.723a.894.894,0,0,1,.894.907Z"
                        transform="translate(2.001 2.331)" fill="#fda703" />
                </g>
            </g>
        </svg>

        <div className={styles["place-card-header-title"]}>
          <span className={`${styles.title} ${styles.ellipsis}`}>ACTUALITÉS</span>
          <span className={`${styles.subTitle} ${styles.ellipsis}`}>
            {news.theme?.[0]}
          </span>
        </div>

        <Link href={headerMoreHref} className={styles["figma-placeCardButton"]}>
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
        <div className={styles.themeTagWrapper}>
          <span className={styles.ellipsis}>{news.theme?.[0]}</span>
        </div>
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
