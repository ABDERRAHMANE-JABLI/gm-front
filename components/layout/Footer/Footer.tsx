'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import GMLogo from '@/public/icons/GaultMillau.svg';

const Footer: React.FC = () => {

  return (
    <footer className={styles.footer}>
      <div className={styles.yellowLine}></div>

      <div className={styles.container}>

        <div className={styles.column}>
          <div className={styles.logoWrapper}>
            <GMLogo width="180"/>
          </div>

          <div className={styles.links}>
            <Link
              href="https://www.gaultmillau.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              À propos
            </Link>

            <Link
              href="/Infos/conditions-generales-de-vente"
              className={styles.link}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Conditions Générales de Vente
            </Link>

            <Link
              href="/Infos/politique-de-confidentialite"
              className={styles.link}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Notre sélection</h4>
          <Link
            href="/toques"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Toques
          </Link>
          <Link
            href="/hospitalite"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Hospitalité
          </Link>
          <Link
            href="/guide"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Le Guide
          </Link>
          <Link
            href="/kit-media"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Kit Média
          </Link>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <address>
            81 BD Moulay Hassan I,<br />
            6<sup>e</sup> étage,<br />
            Casablanca, Maroc
          </address>

          <Link
            href="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Contact
          </Link>

          <a href="tel:+212664082188">Appeler : (+212) 6 64 08 21 88</a>
        </div>

        <div className={styles.column}>
          <h4>Le Kit Média</h4>
          <a
            href="/media/KIT_MEDIA_GAULTMILLAU_MA.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir le Kit Média (PDF)
          </a>

          <p className={styles.copy}>
            Gault&Millau Maroc © 2025
            <br />
            Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;