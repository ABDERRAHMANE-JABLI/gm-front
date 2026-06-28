'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import GMLogo from '@/public/icons/GaultMillau.svg';
import Facebook from '@/public/icons/socialIcon/facebook.svg';
import Instagram from '@/public/icons/socialIcon/instagram.svg';
import Linkedin from '@/public/icons/socialIcon/linkedin.svg';
import Mail from '@/public/icons/socialIcon/Mail.svg';
import { useClientTranslation, Language } from '@/lib/i18n/client';

const SOCIALS = {
  facebook:  'https://www.facebook.com/gaultmillau',
  instagram: 'https://www.instagram.com/gaultmillauma?igsh=ZXg1cHkwcjFocWxq',
  linkedin:  'https://www.linkedin.com/company/gault-millau-maroc',
  email:     'contact@gaultmillau.ma',
};

interface FooterProps {
  lang?: Language;
}

const Footer: React.FC<FooterProps> = ({ lang = 'fr' }) => {
  const { t } = useClientTranslation(lang);

  return (
    <footer className={styles.footer}>
      <div className={styles.yellowLine}></div>

      <div className={styles.container}>

        <div className={styles.column}>
          <div className={styles.logoWrapper}>
            <GMLogo width="180" />
          </div>
          <div className={styles.links}>
            <a
              href="https://www.gaultmillau.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t('footer.about')}
            </a>
            <Link href={`/${lang}/info/cgu`} className={styles.link}>
              {t('footer.cgu')}
            </Link>
            <Link href={`/${lang}/info/cgv`} className={styles.link}>
              {t('footer.cgv')}
            </Link>
            <Link href={`/${lang}/info/politique-de-confidentialite`} className={styles.link}>
              {t('footer.privacy')}
            </Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>{t('footer.our_selection')}</h4>
          <Link href={`/${lang}/info/mot-du-president`}>{t('footer.president')}</Link>
          <Link href={`/${lang}/hospitality`}>{t('footer.hospitality')}</Link>
          <Link href={`/${lang}/guide`}>{t('footer.guide')}</Link>
          <Link href={`/${lang}/info/kit-media`}>{t('footer.kit_media')}</Link>
        </div>

        <div className={styles.column}>
          <h4>{t('footer.contact_title')}</h4>
          <address>
            81 BD Moulay Hassan I,<br />
            6<sup>e</sup> étage,<br />
            Casablanca, Maroc
          </address>
          <Link href={`/${lang}/contact`}>{t('footer.contact_us')}</Link>
          <a href="tel:+212664082188">+212 6 64 08 21 88</a>
        </div>

        <div className={styles.column}>
          <div className={styles.socials}>
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>
              <Facebook width={20} height={20} />
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <Instagram width={20} height={20} />
            </a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <Linkedin width={20} height={20} />
            </a>
            <a href={`mailto:${SOCIALS.email}`} aria-label="Email" className={styles.socialIcon}>
              <Mail width={20} height={20} />
            </a>
          </div>
          <p className={styles.copy}>
            {t('footer.copyright').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
            ))}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
