"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./NewsCard.module.css";
import { NewsCardProps, NewsCardButtonProps } from "@/types/News";
import { hrefCard, hrefButton, defaultLabelByKind } from "@/lib/NewsCard";
import { useClientTranslation } from '@/lib/i18n/client';
import NewsIcon from "@/components/Icons/News";

type Language = 'fr' | 'en';

type Props = {
  lang: Language;               // "fr" | "en"…
  news: NewsCardProps;
  withHeader?: boolean;       // pour la page PLACE
  headerSubtitle?: string;    // ex: "Actus & Rendez-vous"
};

export default function NewsCard({ lang, news, withHeader}: Props) {

  const firstTheme = news.theme?.[0];
  const buttons = news.buttons ?? [];
  const showCTA = buttons.length === 0;
  const cardHref = hrefCard(lang, news.slug);
  const headerSubtitle = news.theme?.[0];

  const { t } = useClientTranslation(lang);

  return (
    <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
      <Link href={cardHref} aria-label={`${news.title} — ${t('common.read_more')}`}>
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>

      {/* Header pour la page LA PLACE */}
      {withHeader && (
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.iconWrapper}>
              <NewsIcon width={28} height={28}/>
            </span>
            <div className={styles.headerTexts}>
              <span className={styles.headerTitle}>{t('navigation.actualites')}</span>
              {headerSubtitle && <span className={styles.headerSubtitle}>{headerSubtitle}</span>}
            </div>
          </div>
            <Link href={`/${lang}/blogs/`} className={styles.moreBtn}>
              {t('common.see_more')}
            </Link>
        </div>
      )}

      {/* Media (image) + badge */}
      <div className={styles.thumbWrapper}>
        <SmartImage id={news.thumbId} alt={news.title} width={666} height={444} fit="cover" lazyload />
        {firstTheme && firstTheme.trim() !== "" && <span className={styles.badge}>{firstTheme}</span>}
      </div>

      {/* Contenu */}
      <div className={styles.body}>
        <h3 className={styles.title}>{news.title}</h3>
        <p className={`${styles.synopsis} ${buttons.length > 1 ? styles.resumTwoLines : styles.resumFourLines}`}>{news.resume}</p>

        <div className={styles.footer}>
          {buttons.length > 0 ? (
            <div className={styles.captionButtons}>
              {buttons.map((btn, idx) => (
                <CaptionButton key={idx} lang={lang} data={btn} />
              ))}
            </div>
          ) : (
            showCTA && (
              <Link href={cardHref} className={styles.cta}>
                <span className={styles.ctaText}>{t('common.read_more')}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </article>
  );
}

function CaptionButton({ lang, data }: { lang: string; data: NewsCardButtonProps }) {
  const label = data.label ?? defaultLabelByKind[data.buttonKind];
  const url = hrefButton(lang, data.buttonKind, data.slug);

  return (
    <Link href={url} className={styles.captionBtn}>
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
