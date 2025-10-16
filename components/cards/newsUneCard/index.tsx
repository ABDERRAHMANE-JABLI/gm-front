"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardButtonProps, NewsCardProps } from "@/types/News";
import { hrefCard, hrefButton, defaultLabelByKind } from "@/utils/NewsCardLink";
import styles from "./SingleNewsCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import NewsIcon from "@/public/icons/menu/blog.svg";


type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    news: NewsCardProps;
};

export default function SingleNewsCard({ lang, news }: Props) {
    const cardHref = hrefCard(lang, news.slug);
    const headerSubtitle = news.theme?.[0];
    const { t } = useClientTranslation(lang);
    const buttons = news.buttons ?? [];
    const showMainButton = buttons.length === 0;

    return (
        <article className={styles.uneCard}>
            <Link href={cardHref} aria-label={`${news.title} — ${t('common.read_more')}`}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                    <span className={styles.iconWrapper}>
                        <NewsIcon width={28} height={28} />
                    </span>
                    <div className={styles.headerTexts}>
                        <span className={styles.headerTitle}>{t('navigation.actualites')}</span>
                        {headerSubtitle && (
                            <span className={styles.headerSubtitle}>{headerSubtitle}</span>
                        )}
                    </div>
                </div>
                <Link href={`/${lang}/blogs/`} className={styles.moreBtn}>
                    {t('common.see_more')}
                </Link>
            </div>

            <div className={styles.details}>
                <div className={styles.contentColumn}>
                    <div className={styles.hrSpacer} />

                    <div className={styles.cardPaddingContainer}>
                        <span className={`${styles.cardTitle} ${styles.clamp3}`}>
                            {news.title}
                        </span>
                    </div>

                    <div className={styles.cardPaddingContainer}>
                        <span className={`${styles.synopsis} ${buttons.length > 1 ? styles.resumTwoLines : styles.resumFourLines}`}>
                            {news.resume}
                        </span>
                    </div>

                    <div className={styles.hrSpacer} />

                    <div className={`${styles.cardPaddingContainer} ${styles.buttonsContainer}`}>
                        {buttons.length > 0 ? (
                            <div className={styles.captionButtons}>
                                {buttons.map((btn, idx) => (
                                    <CaptionButton key={idx} lang={lang} data={btn} />
                                ))}
                            </div>
                        ) : (
                            showMainButton && (
                                <Link href={cardHref} className={styles.figmaCardButton} title={news.title}>
                                    <span className={`text-uppercase ${styles.ellipsis}`}>{t('common.read_more')}</span>
                                </Link>
                            )
                        )}
                    </div>
                </div>

                <div className={styles.thumbnailWrapper}>
                    <div className={styles.thumbnailFrame}>
                        <SmartImage
                            id={news.thumbId}
                            alt={news.title}
                            width={700}
                            height={464}
                            fit="cover"
                            lazyload
                        />
                    </div>
                </div>
                {news.theme?.[0] && (<span className={styles.themeTag}>{news.theme?.[0]}</span>)}
            </div>
        </article>
    );
}

function CaptionButton({ lang, data }: { lang: string; data: NewsCardButtonProps }) {
  const label = data.label ?? defaultLabelByKind[data.buttonKind];
  const url = hrefButton(lang, data.buttonKind, data.slug);

  return (
    <Link href={url} className={styles.figmaCardButton} >
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