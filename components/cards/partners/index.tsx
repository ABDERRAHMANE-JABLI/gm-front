'use client'

import { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import { ApiPartner } from "@/types/api/Partner";

interface Props {
  partners: ApiPartner[];
}

export default function PartenairesSection({ partners = [] }: Props) {
  const s3 = process.env.NEXT_PUBLIC_S3_BASE_URL ?? '';
  const [isPaused, setIsPaused] = useState(false);

  const logos = partners.map(p => ({
    src: `${s3}/${p.thumbId}`,
    url: p.website,
    alt: p.name,
  }));

  if (!logos.length) return null;

  return (
    <section className={style.partenaire}>
      <div className={style.leftWrapper}>

        {/* Header */}
        <div className={style.leftHeader}>
          <div className={style.partenaireLabel}>
            <span className={style.ampersand}>&</span>
            <span>PARTENAIRES</span>
          </div>
          <Link href="/contact" className={style.topBtn}>VOIR PLUS</Link>
        </div>

        <div className={style.left}>
          <div className={style.leftTitle}>
            <h4>Partenaires</h4>
            <p>Retrouvez la liste complète des partenaires qui font confiance à Gault&Millau Maroc</p>
          </div>

          {/* Marquee */}
          <div className={style.leftSlider}>
            <div
              className={style.marquee}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={style.track}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
                {/* Double pour boucle infinie */}
                {[...logos, ...logos].map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.logoLink}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt} className={style.logoImg} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.logoGM}>
          <h4>Devenez Partenaires</h4>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/GaultMillau.svg" width={180} height={37} alt="Gault&Millau" />
        </div>
        <Link href="/contact" className={style.Btn}>En Savoir Plus</Link>
      </div>
    </section>
  );
}
