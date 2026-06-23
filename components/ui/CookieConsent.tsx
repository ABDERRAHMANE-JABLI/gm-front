'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'gm_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1] === 'en' ? 'en' : 'fr';

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  }

  if (!visible) return null;

  const text = lang === 'en'
    ? {
        body: 'With your consent, we and our partners use cookies or similar technologies to store, access and process personal data such as your visit on this website, IP addresses and cookie identifiers. You can withdraw your consent at any time by clicking "Learn more" or by visiting our privacy policy.',
        essential: 'Some cookies are strictly necessary for the proper functioning of the site (navigation, security, language preferences). These cookies do not require your consent and cannot be disabled.',
        learnMore: 'Learn more',
        refuse: 'Refuse',
        accept: 'Accept & Close',
        privacyHref: `/${lang}/info/politique-de-confidentialite`,
      }
    : {
        body: 'Avec votre accord, nous et nos partenaires utilisons des cookies ou technologies similaires pour stocker, consulter et traiter des données personnelles telles que votre visite sur ce site internet, les adresses IP et les identifiants de cookie. Vous pouvez à tout moment retirer votre consentement en cliquant sur « En savoir plus » ou en allant dans notre politique de confidentialité.',
        essential: 'Certains cookies sont strictement nécessaires au bon fonctionnement du site (navigation, sécurité, préférences de langue). Ces cookies ne requièrent pas votre consentement et ne peuvent pas être désactivés.',
        learnMore: 'En savoir plus',
        refuse: 'Refuser',
        accept: 'Accepter & Fermer',
        privacyHref: `/${lang}/info/politique-de-confidentialite`,
      };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Gault<span style={{ color: '#B8860B' }}>&amp;</span>Millau</span>
        </div>

        <p className={styles.body}>{text.body}</p>
        <p className={styles.essential}>{text.essential}</p>

        <div className={styles.buttons}>
          <Link href={text.privacyHref} className={styles.learnMore}>
            {text.learnMore} &rarr;
          </Link>
          <button onClick={refuse} className={styles.refuseBtn}>
            {text.refuse}
          </button>
          <button onClick={accept} className={styles.acceptBtn}>
            {text.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
