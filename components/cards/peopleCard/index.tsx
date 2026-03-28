"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./people.module.css";
import { useClientTranslation } from '@/lib/i18n/client';
import PeopleProps from "@/types/Peoples";
import Toques from "../common/Toques";
import PeopleIcon from "@/public/icons/menu/people.svg";
import CardHeader from "../common/HeaderCard";

type Language = 'fr' | 'en';

type Props = {
    lang: Language;
    People: PeopleProps;
    withHeader?: boolean;
};

export default function PeopleCard({ lang, People, withHeader }: Props) {

    const { t } = useClientTranslation(lang);
    const imageId = People?.thumbId ?? "";
    const numberToques = People.nbToques ?? 7;

    return (
        <article className={`${styles.card} ${withHeader ? styles.cardWithHeather : ''}`}>
            <Link href={`/${lang}/People/${People?.slug}`} aria-label={People.title} title={People.title}>
                <span className={styles.stretchedLink} aria-hidden="true" />
            </Link>

            {/* Header pour la page LA PLACE */}
            {withHeader && (
                <CardHeader title="People" href={`/${lang}/peoples/}`} seeMoreLabel={t("common.see_more")} icon={<PeopleIcon width={28} height={28} />} />
            )}

            <div className={styles.thumbWrapper}>
                <SmartImage id={imageId} alt={People.title} width={666} height={444} fit="cover" lazyload />
            </div>

            {/* Contenu */}
            <div className={styles.body}>
                <div className={styles.cardPaddingContainer}>
                    <Toques nbToques={numberToques} note={People.note} description={People.noteDescription} lang={lang}/>
                </div>

                <div className={styles.cardPaddingContainer}>
                    <h3 className={styles.title}>{People.title}</h3>
                    <span className={styles.subTitle}>{Array.isArray(People.role) ? People.role[0] : People.role}</span>
                </div>
                
                <div className={`${styles.cardPaddingContainer} ${styles.details}`}>
                   {!!People.distinction?.length && (
                        <div className={styles.cardDetail}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>{t("common.distinction")} :</span>
                            <span className={`${styles.figmaCaptionValue} ${styles["clamp-2"]}`}>{People.distinction.slice(0, 2).join(", ")}</span>
                        </div>
                    )} 
                    {!!People.chefAt?.length && (
                        <div className={styles.cardDetail}>
                            <span className={`${styles.figmaCaption} ${styles.ellipsis}`}>Établissements :</span>
                            <span className={`${styles.figmaCaptionValue} ${styles["clamp-2"]}`}>{People.chefAt.map(item => item.name).join(", ")}</span>
                        </div>
                    )} 
                </div>
            </div>
        </article>
    );
}

