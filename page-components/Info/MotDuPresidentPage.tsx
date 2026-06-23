import Image from 'next/image';
import styles from './info.module.css';
import { Language } from '@/lib/i18n/client';

interface Props { lang: Language }

const CONTENT = {
  fr: {
    title:    "Mot du Président",
    name:     "Steve Berdah",
    role:     "Président de Gault&Millau Maroc",
    headline: "Je suis ici pour partir à la découverte des jeunes talents culinaires marocains. Nous avons choisi de nous concentrer sur le Maroc, un pays à la richesse gastronomique exceptionnelle. Notre objectif est de juger et de mettre en valeur la véritable cuisine marocaine, dans toute sa diversité et son authenticité",
    body: "L'adaptation du Guide Gault & Millau au contexte marocain a représenté un véritable défi, mais aussi une formidable opportunité. Le Maroc dispose d'un savoir-faire culinaire exceptionnel, d'une culture du goût et d'une hospitalité profondément enracinée. C'est précisément ce que nous souhaitons valoriser.\n\nChez Gault & Millau, nous ne mettons pas seulement en avant des tables d'exception, mais aussi l'expérience humaine, l'accueil et la générosité qui font d'un repas un véritable moment de partage. Sous cet angle, le Maroc est un modèle : l'hospitalité fait partie intégrante de son ADN.\n\nPour cette première édition, nous prévoyons d'inspecter environ 150 tables, réparties sur trois grandes régions : Maroc Centre, Maroc Sud et Maroc Nord. Le premier guide paraîtra après le mois de Ramadan 2026. Ensuite, nous lancerons des guides régionaux tous les trois mois, afin de mettre en valeur les spécificités locales et les richesses culinaires régionales, qu'il s'agisse des influences andalouses du Nord, des saveurs du Centre ou des parfums du Sud. Un volet digital viendra compléter cette démarche.",
  },
  en: {
    title:    "President's Message",
    name:     "Steve Berdah",
    role:     "President of Gault&Millau Morocco",
    headline: "I am here to discover young Moroccan culinary talents. We chose to focus on Morocco, a country with exceptional gastronomic richness. Our goal is to judge and showcase true Moroccan cuisine, in all its diversity and authenticity.",
    body: "Adapting the Gault & Millau Guide to the Moroccan context was a real challenge, but also a tremendous opportunity. Morocco has exceptional culinary know-how, a culture of taste and deeply rooted hospitality. That is precisely what we want to promote.\n\nAt Gault & Millau, we do not only highlight exceptional tables, but also the human experience, the warmth and generosity that make a meal a true moment of sharing. From this perspective, Morocco is a model: hospitality is an integral part of its DNA.\n\nFor this first edition, we plan to inspect around 150 tables across three major regions: Central Morocco, Southern Morocco and Northern Morocco. The first guide will be published after Ramadan 2026. We will then launch regional guides every three months to highlight the local specificities and regional culinary riches — from the Andalusian influences of the North to the flavours of the Centre and the aromas of the South. A digital component will complement this approach.",
  },
};

export default function MotDuPresidentPage({ lang }: Props) {
  const p = CONTENT[lang] ?? CONTENT.fr;

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.presidentHeader}>
          <div>
            <h1 className={styles.title}>{p.title}</h1>
            <p className={styles.presidentName}>{p.name}</p>
            <p className={styles.presidentRole}>{p.role}</p>
          </div>
        </div>

        {/* ── Corps : image flottante + texte qui l'habille ── */}
        <div className={styles.presidentBody}>

          <Image
            src="/images/president.png"
            alt={p.name}
            width={360}
            height={460}
            className={styles.presidentImg}
          />

          <blockquote className={styles.presidentQuote}>
            {p.headline}
          </blockquote>

          {p.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.presidentParagraph}>{para}</p>
          ))}

          <div className={styles.presidentClear} />
        </div>

      </div>
    </div>
  );
}
