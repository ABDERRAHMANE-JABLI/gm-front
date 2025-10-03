"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./people.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import PeopleProps from "@/types/Peoples";
import Toques from "../common/Toques";

type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    People: PeopleProps;
};

export default function PeopleCard({ lang, People }: Props) {

    const { t } = useClientTranslation(lang);
    const imageId = People?.thumbId ?? "";
    const numberToques = People.nbToques ?? 7;

    return (
        <article className={styles.card}>
            <Link href={`/${lang}/People/${People?.slug}`} aria-label={People.title} title={People.title}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>
            <div className={styles.thumbWrapper}>
                <SmartImage id={imageId} alt={People.title} width={666} height={444} fit="cover" lazyload />
            </div>

            {/* Contenu */}
            <div className={styles.body}>
                
                <div className={styles.cardPaddingContainer}>
                    <Toques nbToques={numberToques} note={People.note} description={People.noteDescription}/>
                </div>

                <div className={styles.cardPaddingContainer}>
                    <h3 className={styles.title}>{People.title}</h3>
                    <span className={styles.subTitle}>{People.activity?.[0]}</span>
                </div>
                
                <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                   {People.distinction && (
                        <div className={styles.cardDetail}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Distinction :</span>
                            <span className={`${styles.figmaCaptionValue} ${styles["clamp-2"]}`}>{People.distinction.slice(0, 2).join(", ")}</span>
                        </div>
                    )} 
                    {People.establishmentType && People.establishmentTitle && (
                        <div className={styles.cardDetail}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{People.establishmentType} :</span>
                            <span className={`${styles.figmaCaptionValue} ${styles["clamp-1"]}`}>{People.establishmentTitle}</span>
                        </div>
                    )} 
                </div>
            </div>
        </article>
    );
}

