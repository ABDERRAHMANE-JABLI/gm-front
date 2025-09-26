"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { NewsCardProps } from "@/types/News";
import { hrefCard } from "@/lib/NewsCard";
import styles from "./SingleNewsCard.module.css";
import { useClientTranslation } from '@/lib/i18n/client';


type Language = 'fr' | 'en';

type Props = {
  lang: Language;
  card: NewsCardProps;
  withHeader?: boolean;
  headerSubtitle?: string;
  headerMoreHref?: string;
};

export default function SingleNewsCard({ lang, card, withHeader }: Props) {
  const cardHref = hrefCard(lang, card.slug);
  const headerMoreHref = "/" + lang + "/blogs";
  const headerSubtitle = card.theme?.[0];
  const { t } = useClientTranslation(lang);

  return (
    <article className="uneDeux-card d-none d-lg-flex">
      <div className="place-card-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64">
          <defs>
            <clipPath id="clip-path">
              <rect width="28.602" height="27.028" fill="rgba(0,0,0,0.2)" />
            </clipPath>
            <clipPath id="clip-path-2">
              <rect width="28.602" height="27.028" fill="#ffffffff" />
            </clipPath>
          </defs>
          <g transform="translate(-114.5 -28)">
            <rect width="64" height="64" rx="18" transform="translate(114.5 28)" fill="#fda703" />
            <g transform="translate(130.5 45.052) scale(1.3)">
              <g transform="translate(1.229 1.229)">
                <g clipPath="url(#clip-path)">
                  <path
                    d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z"
                    fill="rgba(0,0,0,0.1)" />
                </g>
              </g>
              <g>
                <g clipPath="url(#clip-path-2)">
                  <path
                    d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894Zm-.894,7.2a1.864,1.864,0,0,1-3.723,0V17.948h3.723Z"
                    fill="#fff" />
                  <path
                    d="M27.708,16.16H23.091V.894A.893.893,0,0,0,22.2,0H.894A.893.893,0,0,0,0,.894v22a4.143,4.143,0,0,0,4.138,4.138H24.955A3.651,3.651,0,0,0,28.6,23.364v-6.31a.893.893,0,0,0-.894-.894ZM4.138,25.223a2.355,2.355,0,0,1-2.351-2.333V1.788H21.3V23.365a3.618,3.618,0,0,0,.514,1.859Zm22.675-1.859a1.864,1.864,0,0,1-3.723,0V17.948h3.723ZM17.46,6.525a.893.893,0,0,1-.894.894H5.424a.894.894,0,0,1,0-1.787H16.566a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H5.424a.894.894,0,1,1,0-1.787H16.566a.894.894,0,0,1,.894.907Z"
                    fill="#fff" />
                </g>
              </g>
              <path
                d="M16.617,5.477a.893.893,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.894Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,0,1,0-1.787H15.723a.894.894,0,0,1,.894.9Zm0,5.81a.894.894,0,0,1-.894.894H4.582a.894.894,0,1,1,0-1.787H15.723a.894.894,0,0,1,.894.907Z"
                transform="translate(2.001 2.331)" fill="#fda703" />
            </g>
          </g>
        </svg>
        <div className="place-card-header-title">
          <span className="title ellipsis">ACTUALITÉS</span>
          <span className="subTitle ellipsis">Actus &amp; Rendez-vous</span>
        </div>

        <a className="figma-placeCardButton" data-controller="components--figma--buttons--PlaceCardButton"
          href="/fr/search/blog">
          <span className="text-uppercase ellipsis">Voir Plus</span>
        </a>

      </div>

      <div className="thumbnail-wrapper">
        <SmartImage id={card.thumbId} alt={card.title} width={666} height={444} fit="cover" lazyload />
        <div className="themeTagWrapper">
          <span className="ellipsis">Actus &amp; Rendez-vous</span>
        </div>
      </div>

      <div className="cardPaddingContainer titleContainer">
        <span className="card-title center clamp-2" data-controller="components--Figma--Texts--CardTitle">
          Hugues Pouget : sa première adresse parisienne ouvrira en fin d’année
        </span>
      </div>

      <div className="cardPaddingContainer buttonsContainer">
        <a className="figma-cardButton" title="Hugues Pouget : sa première adresse parisienne ouvrira en fin d’année"
          aria-label="Hugues Pouget : sa première adresse parisienne ouvrira en fin d’année"
          href="/fr/news/hugues-pouget-sa-premiere-adresse-parisienne-ouvrira-en-fin-d-annee">
          <span className="text-uppercase ellipsis">Lire Plus</span>
        </a>
      </div>

      <a href="/fr/news/hugues-pouget-sa-premiere-adresse-parisienne-ouvrira-en-fin-d-annee"
        aria-label="Hugues Pouget : sa première adresse parisienne ouvrira en fin d’année"
        title="Hugues Pouget : sa première adresse parisienne ouvrira en fin d’année" className="stretched-link">
      </a>
    </article>
  );
}
