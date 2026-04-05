"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./RestaurantCard.module.css";
import { RestaurantProps } from "@/types/Restaurant";
import Toques from "../common/Toques";
import { isOpenNow } from "@/utils/openingHour";
import { useClientTranslation } from "@/lib/i18n/client";
import RestaurantIcon from "@/public/icons/menu/restaurant.svg";
import CardHeader from "../common/HeaderCard";
import CheckIcon from "@/public/icons/check.svg";

type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    restaurant: RestaurantProps;
    withHeader?: boolean;
};

export default function RestaurantCard({ lang, restaurant, withHeader }: Props) {

    const { t } = useClientTranslation(lang);

    const imageId = restaurant?.thumbId ?? "";
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      setIsOpen(isOpenNow(restaurant.openingHours));
    }, [restaurant.openingHours]);

    return (
        <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
            <Link href={`/${lang}/restaurant/${restaurant?.slug}`} aria-label={restaurant.title} title={restaurant.title}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            
            {/* Header pour la page LA PLACE */}
            {withHeader && (
                <CardHeader title="Restaurant" href={`/${lang}/restaurants/`} seeMoreLabel={t("common.see_more")} icon={<RestaurantIcon width={28} height={28} />} />
            )}

            <div className={styles.thumbWrapper}>
                <SmartImage id={imageId} alt={restaurant.title} width={666} height={444} fit="cover" lazyload />
                {isOpen && (
                    <span className={`${styles.statusBadge} ${styles.statusOpen}`} role="status">
                        <CheckIcon className={styles.svgCheck} />
                        <span>Ouvert</span>
                    </span>
                )}

                {restaurant.distance && (
                    <span className={styles.distanceBadge}>
                        <span>{restaurant.distance}</span>
                    </span>
                )}

                <span className={styles.favorite}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.071 13.142L13.414 18.8a2 2 0 0 1-2.828 0l-5.657-5.657A5 5 0 1 1 12 6.072a5 5 0 0 1 7.071 7.07"></path></svg>
                </span>
            </div>

            {/* Contenu */}
            <div className={styles.body}>
                
                <div className={styles.cardPaddingContainer}>
                    <Toques nbToques={restaurant.nbToques} isSponsorised={restaurant.isSponsorised} note={restaurant.note} description={restaurant.noteDescription} lang={lang}/>
                </div>

                <div className={styles.cardPaddingContainer}>
                    <h3 className={styles.title}>{restaurant.title}</h3>
                </div>
                
                {/* Details */}
                <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                    {restaurant.address && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.address")} </span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`} title={restaurant.address}>{restaurant.address}</span>
                        </div>
                    )}
                    {restaurant.chief && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.chef")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`} title={restaurant.chief}>{restaurant.chief}</span>
                        </div>
                    )}
                    {!!restaurant.cuisines?.length && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.cooking")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis} ${styles.outlined} ${restaurant.isSponsorised ? styles.bgSponsored : ''}`}>{restaurant.cuisines.join(" | ")}</span>
                        </div>
                    )}
                    {restaurant.budget && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.budget")}</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}>{restaurant.budget}</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

