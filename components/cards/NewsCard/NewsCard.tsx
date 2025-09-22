"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./NewsCard.module.css";
import { NewsCardProps, NewsCardButtonProps } from "@/types/News";
import { hrefCard, hrefButton, defaultLabelByKind } from "@/lib/NewsCard";
import { useClientTranslation } from '@/lib/i18n/client';

type Language = 'fr' | 'en';

type Props = {
  lang: Language;               // "fr" | "en"…
  cards: NewsCardProps;
  withHeader?: boolean;       // pour la page PLACE
  headerSubtitle?: string;    // ex: "Actus & Rendez-vous"
  headerMoreHref?: string;    // lien "VOIR PLUS"
};

export default function NewsCard({ lang, cards, withHeader, headerSubtitle, headerMoreHref }: Props) {

  const firstTheme = cards.theme?.[0];
  const buttons = cards.buttons ?? [];
  const showCTA = buttons.length === 0;
  const cardHref = hrefCard(lang, cards.slug);

  const { t } =  useClientTranslation(lang);

  return (
    <article className={styles.card}>
      {withHeader && (
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.iconWrapper}>
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
                        <path d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z" fill="rgba(0,0,0,0.1)" />
                      </g>
                    </g>
                    <g>
                      <g clipPath="url(#clip-path-2)">
                        <path d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894Zm-.894,7.2a1.864,1.864,0,0,1-3.723,0V17.948h3.723Z" fill="#fff" />
                        <path d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z" fill="#fff" />
                      </g>
                    </g>
                    <path d="M16.617,5.477a.893.893,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,1,1,0-1.787H15.723a.894.894,0,0,1,.894.907Z" transform="translate(2.001 2.331)" fill="#fda703" />
                  </g>
                </g>
              </svg>
            </span>
            <div className={styles.headerTexts}>
              <span className={styles.headerTitle}>{t('navigation.actualites')}</span>
              {headerSubtitle && <span className={styles.headerSubtitle}>{headerSubtitle}</span>}
            </div>
          </div>
          {headerMoreHref && (
            <Link href={headerMoreHref} className={styles.moreBtn}>
              {t('common.see_more')}
            </Link>
          )}
        </div>
      )}

      {/* Media (image) + badge */}
      <div className={styles.thumbWrapper}>
        <Link href={cardHref} className={styles.imageLink} aria-label={cards.title}>
          <SmartImage id={cards.thumbId} alt={cards.title} width={666} height={444} fit="cover" lazyload />
        </Link>

        {firstTheme && <span className={styles.badge}>{firstTheme}</span>}
      </div>

      {/* Contenu */}
      <div className={styles.body}>
        <h3 className={styles.title}>{cards.title}</h3>
        <p className={styles.synopsis}>{cards.resume}</p>

        {/* Footer boutons / CTA */}
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
