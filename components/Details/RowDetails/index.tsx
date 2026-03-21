"use client";

import React from "react";
import styles from "./details.module.css";

import SocialLinks from "../SocialLink";

interface Props {
    children: React.ReactNode; // Exemple : details du restaurant ou hotel selon l'utilisation du composant 
    budget?: string; // Exemple : 150 à 200
    budgetDescription?: string; // Exemple : Budget à titre indicatif par personne (hors boissons) / Prix par Nuit
    links?: any; // Exemple : facebook, tel, email ...
}

export default function RowDetails({ links, budget, budgetDescription, children }: Props) {

    return (
        <div className={styles.RowDetails}>
            <div className={styles.colLeft}>
                <div className={styles.childrenContent}>
                    {children}
                </div>
                <div className={`${styles.paddingContainer} ${styles.links}`}>
                    {links && <SocialLinks links={links}/>}
                </div>
            </div>
            <div className={styles.colRight}>
                <div className={styles.paddingContainer}>
                    <div className={styles.Budget}>
                        <div className={styles.text}>
                            <span className={styles.rowPrice}>Price</span>
                            <span>{budgetDescription}</span>
                        </div>
                        <div className={styles.price}>
                            <span>{budget}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

