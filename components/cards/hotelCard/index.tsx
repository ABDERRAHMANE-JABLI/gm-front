"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./hotelsCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import { HotelProps } from "@/types/Hotels";
import { isOpenNow } from "@/utils/openingHour";
import Stars from "../common/Stars";
import Toques from "../common/Toques";

type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    Hotel: HotelProps;
};

export default function HotelCard({ lang, Hotel }: Props) {

    const { t } = useClientTranslation(lang);
    const imageId = Hotel?.thumbId ?? "";
    // const isOpen = isOpenNow(Hotel.openingPeriods);

    return (
        <article className={styles.card}>
            <Link href={`/${lang}/hotels/${Hotel?.slug}`} aria-label={Hotel.title} title={Hotel.title}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            <div className={styles.thumbWrapper}>
                <SmartImage id={imageId} alt={Hotel.title} width={666} height={444} fit="cover" lazyload />

                {/*{isOpen && (
                    <span className={`${styles.statusBadge} ${styles.statusOpen}`} role="status">
                        <svg width="10px" height="10px" viewBox="0 0 1600 1280" fill="currentColor" className="svgCheck" aria-hidden="true"><path fill="currentColor" d="M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68"></path>
                        </svg>
                        <span>Ouvert</span>
                    </span>
                )}*/}

                {Hotel.distance && (
                    <span className={styles.distanceBadge}>
                        <span>{Hotel.distance}</span>
                    </span>
                )}

                {/*<span className={styles.favorite}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.071 13.142L13.414 18.8a2 2 0 0 1-2.828 0l-5.657-5.657A5 5 0 1 1 12 6.072a5 5 0 0 1 7.071 7.07"></path></svg>
                </span> */}

            </div>

            {/* Contenu */}
            <div className={styles.body}>
                
                <div className={styles.cardPaddingContainer}>
                    <Stars nbStars={Hotel.nbStars} description={Hotel.nbStarsDescription}/>
                </div>

                <div className={styles.cardPaddingContainer}>
                    <h3 className={styles.title}>{Hotel.title}</h3>
                </div>
                
                {/* Details */}
                <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                    {Hotel.address && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Lieu</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis} ${styles.textUpper}`} title={Hotel.address}>{Hotel.address}</span>
                        </div>
                    )}
                    
                    {!!Hotel.services?.length && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Truc en +</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}>{Hotel.services.join(", ")}</span>
                        </div>
                    )}
                    {Hotel.budget && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>budget</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}>{Hotel.budget}</span>
                        </div>
                    )}
                    {Hotel.restaurantNbtoques != null && (
                        <div className={styles.cardDetailHor}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Restaurant</span>
                            <span className={`${styles.figmaCaptionValue} ${styles.ellipsis}`}><Toques nbToques={Hotel.restaurantNbtoques} withDescription={false}/></span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

