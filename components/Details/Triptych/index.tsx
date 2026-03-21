"use client";

import React, { useState, useEffect } from "react";
import { SmartImage } from "@/components/SmartImage";
import styles from "./Triptych.module.css";
import Logo from '@/public/icons/GaultMillau.svg';
import ArrowLeft from '@/public/icons/arrowLeft.svg';
import ArrowRight from '@/public/icons/arrowRight.svg';
import Close from "@/public/icons/close.svg";
import { ImageProps } from "@/types/Image";

interface ImgContainerProps {
    images: ImageProps[];
    title:string;
}

export default function Triptych({ images, title }: ImgContainerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const openModal = (index: number) => {
        setCurrent(index);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c + 1) % images.length);

    // Bloquer le scroll derrière la modale
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);
    
    // pour effectuer l'effet de transition
    useEffect(() => {
        setAnimating(true);
        const timeout = setTimeout(() => setAnimating(false), 300);
        return () => clearTimeout(timeout);
    }, [current]);

    return (
        <>
            <div className={`${styles.Triptych} ${styles.pointer}`}>
                <div className={styles.mainView}>
                    <div className={styles.wrapper} onClick={() => openModal(0)}>
                        <SmartImage id={images[0].id} alt={title} width={666} height={444} fit="contain" />
                        {images[0].copyRight && <div className={styles.Copyright}>{images[0].copyRight}</div>}
                    </div>
                </div>
                <div className={styles.secondView}>
                    {images.slice(1, 3).map((img, i) => (
                        <div key={i} className={styles.wrapper} onClick={() => openModal(i + 1)}>
                            <SmartImage id={img.id} alt={title} width={666} height={444} fit="cover"/>
                            {img.copyRight && <div className={styles.Copyright}>{img.copyRight}</div>}
                        </div>
                    ))}
                </div>
                <div className={styles.photoCounter}>{images.length} PHOTOS</div>
            </div>

            {isOpen && (
                <div
                    className={`${styles.triptychmodal} modal fade show`}
                    style={{ display: "block" }}
                    aria-modal="true"
                    role="dialog">
                    <div className={`${styles["modal-dialog"]} ${styles["modal-fullscreen"]}`}>
                        <div className={styles["modal-content"]}>
                            <div className={styles["modal-header"]}>
                                <Logo fill="currentColor" alt="Logo Gault&Millau" className={`${styles["img-fluid"]} ${styles.logoImg}`} style={{ maxWidth: "140px" }} />
                                <button
                                    type="button"
                                    className={styles["btn-close"]}
                                    aria-label="Close" title="Close" onClick={closeModal}>
                                    <Close />
                                </button>
                            </div>
                            <div className={styles["modal-body"]}>
                                <div className={`${styles["owl-carousel"]} ${styles["owl-theme"]} ${styles["owl-red-theme"]} ${styles["owl-carousel"]} px-0 px-xl-4`}>
                                    <button
                                        type="button"
                                        className={`${styles["nav-button"]} ${styles["owl-prev"]} p-0`}
                                        onClick={prev}
                                        aria-label="Previous"
                                        title="Previous"
                                    >
                                        <ArrowLeft width="50" height="50" className={styles.arrow} style={{ color: "#ffe700" }} />
                                    </button>
                                    <div key={current}className={`${styles.zoomImage} ${animating ? "" : styles.active}`}>
                                        <SmartImage
                                            id={images[current].id}
                                            alt={title}
                                            width={1000}
                                            height={666}
                                            fit="cover"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className={`${styles["nav-button"]} ${styles["owl-next"]} p-0`}
                                        onClick={next}
                                        aria-label="Next"
                                        title="Next">
                                        <ArrowRight width="50" height="50" className={styles.arrow} style={{ color: "#ffe700" }} />
                                    </button>
                                    <div className={styles.CopyrightModal}>{images[current].copyRight}</div>
                                </div>
                                <div className={styles.owlDots}>
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrent(i)}
                                            className={`${styles.owlDot} ${i === current ? styles.active : ""}`}
                                            aria-label={`Go to Image ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
