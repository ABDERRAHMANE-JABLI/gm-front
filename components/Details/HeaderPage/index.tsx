"use client";

import React from "react";
import styles from "./headerPage.module.css";
import Share from "@/public/icons/share.svg";
import ToBook from "@/public/icons/toBook.svg"

interface HeaderProps {
    title: string;
    subTitle: string;
    children: React.ReactNode;
}

export default function HeaderPage({ title, subTitle, children }: HeaderProps) {

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: subTitle,
                    url: window.location.href,
                });
                console.log("Partage réussi");
            } catch (error) {
                console.warn("Partage annulé ou erreur :", error);
            }
        } else {
            alert("Le partage n’est pas supporté par votre navigateur.");
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.colLeft}>
                <div className={styles.paddingContainer}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                <div className={styles.paddingContainer}>
                    <h2 className={styles.subTitle}>{subTitle}</h2>
                </div>
            </div>
            <div className={styles.colRight}>
                <div className={styles.paddingContainer}>
                    {children}
                </div>
                <div className={styles.paddingContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.btn}>
                            <span className={styles.btnText} onClick={handleShare}><Share /> Partager</span>
                        </button>
                        <button className={styles.btn}>
                            <span className={styles.btnText}><ToBook /> Réserver</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
