"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./winnery.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import { WineryProps } from "@/types/Winery";
import WineryIcon from "@/components/Icons/WInnery";

type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  Winery: WineryProps;
  withHeader?: boolean;
};

export default function WineryCard({ lang, Winery, withHeader }: Props) {

  const { t } = useClientTranslation(lang);
  const imageId = Winery?.thumbId ?? "07df5907-c383-48a9-910f-8b78ce49852d";

  return (
    <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
      <Link href={`/${lang}/wineries/${Winery?.slug}`}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>

      {/* Header pour la page LA PLACE */}
      {withHeader && (
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.iconWrapper}>
              <WineryIcon width={28} height={28} />
            </span>
            <div className={styles.headerTexts}>
              <span className={styles.headerTitle}>{t('products.winnery')}</span>
            </div>
          </div>
          <Link href={`/${lang}/wineries/`} className={styles.moreBtn}>
            {t('common.see_more')}
          </Link>
        </div>
      )}
      <div className={styles.thumbWrapper}>
        <SmartImage id={imageId} width={666} height={444} fit="cover" lazyload />
      </div>

      <div className={styles.body}>
        <div className={`${styles.cardPaddingContainer} ${styles.titleContainer}`}>
          <span className={`${styles.leftContent}`}>{Winery.title}</span>
          <span className={`${styles.rightContent}`}>
            <svg id="Calque_champagne" data-name="Calque_champagne" viewBox="0 0 600 600" fill="currentColor" width="26px" height="26px" className={styles["producer-kind"]} aria-hidden="true">
              <defs>
                <style>{`
                .champagne-cls-1 { fill: #fff; }
                .champagne-cls-2 { fill: #0d6a55; }
              `}</style>
              </defs>
              <path
                id="Rectangle_1403"
                data-name="Rectangle 1403"
                className="champagne-cls-2"
                d="M168.75,0l262.5.27c93.2.1,168.75,75.69,168.75,168.85v262.38c0,93.16-75.55,168.6-168.75,168.5l-262.5-.27c-93.2-.1-168.75-75.69-168.75-168.85V168.5C0,75.35,75.55-.09,168.75,0Z"
              />
              <g>
                <path
                  className="champagne-cls-1"
                  d="M422.52,191.39l-26.34-23.18c-4.55-4-11.47-3.56-15.48.99-3.1,3.52-3.52,8.46-1.45,12.37-4.52,5.25-12.27,13.89-25.58,28.11-32.97,35.25-73.65,63.76-122.82,88.65-49.17,24.89-93.2,81.55-107.22,105.24-14.03,23.68-5.12,33.47,2.57,40.24,5.82,5.12,19.82,17.44,26.27,23.12,2.07,1.82,3.37,2.96,3.37,2.96,6.45,5.68,20.45,18,26.27,23.12,7.68,6.76,18.53,14.36,40.24-2.56,21.71-16.92,72.32-67.79,90.76-119.73,18.44-51.94,41.55-95.91,72.33-133.1,12.12-14.64,19.63-23.36,24.29-28.56,4.44,2.62,10.26,1.81,13.79-2.2,4-4.55,3.56-11.48-.99-15.48ZM225.66,469.04l-81.22-71.48,43.47-49.39,16.49,14.51c.16-.19.29-.39.45-.57,11.74-13.34,32.06-14.63,45.4-2.89,13.34,11.74,14.63,32.06,2.9,45.39-.16.19-.35.35-.51.52l16.49,14.52-43.47,49.39Z"
                />
                <path
                  className="champagne-cls-1"
                  d="M478.64,124.89l-25.24-22.22c-6.06-5.33-15.3-4.74-20.64,1.32l-4.83,5.49c-5.34,6.06-4.75,15.3,1.32,20.63l-14.01,15.92c-5.33,6.06-4.74,15.3,1.32,20.63l2.19,1.93c6.06,5.33,15.3,4.75,20.63-1.32l14.01-15.91,1.1.96c6.06,5.34,15.3,4.75,20.63-1.32l4.83-5.49c5.34-6.06,4.75-15.3-1.31-20.63Z"
                />
              </g>
            </svg>
          </span>
        </div>
        <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
          {Winery.address && (
            <div className={styles.cardDetailHor}>
              <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t('common.address')}</span>
              <span className={`${styles.figmaCaptionValue} ${styles.ellipsis} ${styles.textUpper}`} title={Winery.address}>{Winery.address}</span>
            </div>
          )}
          {!!Winery.productions && (
            <div className={styles.cardDetailHor}>
              <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Production</span>
              <span className={`${styles.figmaCaptionValue} ${styles['clamp-2']}`}>{Winery.productions.join(", ")}</span>
            </div>
          )}
          {!!Winery.services && (
            <div className={styles.cardDetailHor}>
              <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t('common.service')}</span>
              <span className={`${styles.figmaCaptionValue} ${styles['clamp-2']}`}>{Winery.services.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}




