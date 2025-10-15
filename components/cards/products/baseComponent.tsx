"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import styles from "./base.module.css";
import React from "react";

type Props = {
    brand: string;
    title: string;
    note: string;
    typeProduct: string;
    thumbId?: string;
    hrefProduct: string;
    header?: React.ReactNode;
    children: React.ReactNode
};

export default function BaseComponent({ brand, title, note, typeProduct, thumbId, hrefProduct,header, children }: Props) {
    const imageId = thumbId || "";
    return (
        <article className={`${styles.card} ${header && styles.cardWithHeader}`}>
            {header}
            <Link href={hrefProduct} aria-label={title}>
                <div className={`${styles.cardkindEmpty} ${styles.cardkindProduct}`}>
                    <div className={`${styles.cardPaddingContainer} ${styles.titleContainer}`}>
                        <span className={styles.cardTitle}>
                            {brand}
                        </span>
                        <span className={`${styles.subTitle} ${styles.ellipsis}`}>
                            {title}
                        </span>
                    </div>

                    <div className={`${styles.cardPaddingContainer}`}>
                        <div className={styles.MarkRibbonProduct}>
                            <span className={styles.mrMark}>{note}</span>
                            <span>/</span>
                            <span className={styles.mrMaxMark}>100</span>
                            <span className={`${styles.mrDescription}`}>
                                {typeProduct}
                            </span>
                        </div>
                    </div>

                    <div className={`${styles.cardPaddingContainer} ${styles.imageAndDetails}`}>
                        <div className={styles.imageWrapper}>
                            <SmartImage id={imageId} alt={title} width={120} height={250} fit="contain" background={[255, 255, 255, 0]} lazyload />
                        </div>
                        {children}
                    </div>
                </div>
            </Link>

        </article>
    );
}

