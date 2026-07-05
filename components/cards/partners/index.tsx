'use client'

import { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import { ApiPartner } from "@/types/api/Partner";
import GMLogo         from '@/public/icons/GaultMillau.svg';
import { useClientTranslation, Language } from '@/lib/i18n/client';

interface Props {
  partners: ApiPartner[];
  lang?: Language;
}

export default function PartenairesSection({ partners = [], lang = 'fr' }: Props) {
  const { t } = useClientTranslation(lang);
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
            <span>{t('partners.label')}</span>
          </div>
          <Link href={`/${lang}/partners`} className={style.topBtn}>{t('partners.see_more')}</Link>
        </div>

        <div className={style.left}>
          <div className={style.leftTitle}>
            <h4>{t('partners.title')}</h4>
            <GMLogo width={100}/>
            <p>{t('partners.description')}</p>
          </div>

          {/* Marquee */}
          <div className={style.leftSlider}>
            <div className={style.marquee} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <div
                className={style.track}
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running',
                  animationDuration: `${logos.length * 3}s`,
                }}
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
          <h4>{t('partners.become')}</h4>
          <GMLogo width={150}/>
        </div>
        <Link href={`/${lang}/contact`} className={style.BtnPlus}>{t('partners.learn_more')}</Link>
      </div>
    </section>
  );
}
