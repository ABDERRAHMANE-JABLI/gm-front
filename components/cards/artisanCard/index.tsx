"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./artisanCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import { ArtisanProps } from "@/types/Artisans";
import ArtisanIcon from "@/public/icons/menu/artisan.svg";
import CardHeader from "../common/HeaderCard";

type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    withHeader?:boolean;
    Artisan: ArtisanProps;
};

export default function ArtisanCard({ lang, Artisan, withHeader }: Props) {

    const { t } = useClientTranslation(lang);
    const imageId = Artisan?.thumbId ?? "";

    return (
        <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
            <Link href={`/${lang}/artisans/${Artisan?.slug}`} aria-label={Artisan.title}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            {withHeader && (
                <CardHeader title="Artisan" href={`/${lang}/artisans/`} seeMoreLabel={t("common.see_more")} icon={<ArtisanIcon width={28} height={28} />} />
            )}
            <div className={styles.thumbWrapper}>
                <SmartImage id={imageId} alt={Artisan.title} width={666} height={444} fit="cover" lazyload />
            </div>

            {/* Contenu */}
            <div className={styles.body}>

                <div className={styles.cardPaddingContainer}>
                    <div className={`${styles.MarkRibbonActivity} ${!Artisan.isGmSelected ? styles.sponsored : ""} }`}>
                        <span className={`${styles.leftText} ${styles.ellipsis}`}>{!Artisan.isGmSelected ? t("common.sponsored") : t("common.selected")}</span>
                        <span className={`${styles.rightText} ${styles.ellipsis}`}>{Artisan.primaryActivity}</span>
                    </div>
                </div>

                <div className={styles.cardPaddingContainer}>
                    <h3 className={styles.title}>{Artisan.title}</h3>
                </div>

                {/* Details */}
                <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                    {Artisan.address && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.address")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis} ${styles.textUpper}`} title={Artisan.address}>{Artisan.address}</span>
                        </div>
                    )}
                    {Artisan.otherActivities && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.activity")}</span>
                            <span className={`${styles.figmaCaptionValue}`}>{Artisan.otherActivities?.[0]}</span>
                        </div>
                    )}
                    {!!Artisan.services?.length && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.service")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles['clamp-2']}`}>{Artisan.services.join(", ")}</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

