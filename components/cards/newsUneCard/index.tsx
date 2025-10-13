"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardProps } from "@/types/News";
import { hrefCard } from "@/lib/NewsCard";
import styles from "./SingleNewsCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import NewsIcon from "@/components/Icons/News";


type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    news: NewsCardProps;
    withHeader?: boolean;
    headerSubtitle?: string;
};

export default function SingleNewsCard({ lang, news }: Props) {
    const cardHref = hrefCard(lang, news.slug);
    const headerSubtitle = news.theme?.[0];
    const { t } = useClientTranslation(lang);

    return (
        <article className={styles.uneCard}>
            <Link href={cardHref} aria-label={`${news.title} — ${t('common.read_more')}`}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                    <span className={styles.iconWrapper}>
                        <NewsIcon width={28} height={28}/>
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
                        <span className={`${styles.clamp5} ${styles.synopsis}`}>
                            {news.resume}
                        </span>
                    </div>

                    <div className={styles.hrSpacer} />

                    <div className={`${styles.cardPaddingContainer} ${styles.buttonsContainer}`}>
                        <Link
                            href={cardHref}
                            className={styles.figmaCardButton}
                            title={news.title}
                            aria-label={news.title}
                        >
                            <span className={`${styles.textUppercase} ${styles.ellipsis}`}>
                                {t('common.read_more')}
                            </span>
                        </Link>
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