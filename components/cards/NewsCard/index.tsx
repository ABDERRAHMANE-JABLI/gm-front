"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./NewsCard.module.css";
import { NewsCardProps, NewsCardButtonProps } from "@/types/News";
import { hrefCard, hrefButton, defaultLabelByKind } from "@/utils/NewsCardLink";
import { useClientTranslation } from '@/lib/i18n/client';
import NewsIcon from "@/public/icons/menu/blog.svg";
import CardHeader from "../common/HeaderCard";

type Language = 'fr' | 'en';

type Props = {
  lang: Language;               // "fr" | "en"…
  news: NewsCardProps;
  withHeader?: boolean;       // pour la page PLACE
};

export default function NewsCard({ lang, news, withHeader}: Props) {

  const firstTheme = news.theme?.[0];
  const buttons = news.buttons ?? [];
  const showMainButton = buttons.length === 0;
  const cardHref = hrefCard(lang, news.slug);
  const headerSubtitle = news.theme?.[0];

  const { t } = useClientTranslation(lang);

  return (
    <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
      <Link href={cardHref} aria-label={news.title} title={news.title} >
        <span className={styles.stretchedLink} aria-hidden="true" />
      </Link>

      {/* Header pour la page LA PLACE */}
      {withHeader && (
        <CardHeader title={t('navigation.actualites')} href={`/${lang}/blogs/}`} seeMoreLabel={t("common.see_more")} subtitle={headerSubtitle} icon={<NewsIcon width={28} height={28}/>} />
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
            showMainButton && (
              <Link href={cardHref} className={styles.MainButton}>
                <span className={styles.MainButtonText}>{t('common.read_more')}</span>
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
