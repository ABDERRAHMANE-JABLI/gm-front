import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { Language, getTranslation } from '@/lib/i18n';

interface HeaderProps {
  className?: string;
  language?: Language;
}

/**
 * Header component for Gault&Millau website
 */
const Header: React.FC<HeaderProps> = ({ className = '', language = 'fr' }) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ');
  const t = (key: string) => getTranslation(key, language);

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href={`/${language}`} className={styles.logoLink}>
            <span className={styles.logoText}>Gault&Millau</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href={`/${language}`} className={styles.navLink}>
                {t('common.home')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}`} className={styles.navLink}>
                La Place
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/blogs`} className={styles.navLink}>
                {t('common.news')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/restaurants`} className={styles.navLink}>
                {t('common.restaurants')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/wines`} className={styles.navLink}>
                {t('common.wines')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/champagnes`} className={styles.navLink}>
                {t('common.champagnes')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/spirits`} className={styles.navLink}>
                {t('common.spirits')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/wineries`} className={styles.navLink}>
                {t('common.wineries')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/hotels`} className={styles.navLink}>
                {t('common.hotels')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/artisans`} className={styles.navLink}>
                {t('common.artisans')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/recipes`} className={styles.navLink}>
                {t('common.recipes')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/peoples`} className={styles.navLink}>
                {t('common.people')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href={`/${language}/utensils`} className={styles.navLink}>
                {t('common.utensils')}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search & Language */}
        <div className={styles.headerActions}>
          <div className={styles.search}>
            <input 
              type="text" 
              placeholder={t('common.search_placeholder')}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.language}>
            <Link href="/en" className={styles.langLink}>EN</Link>
            <span className={styles.langSeparator}>|</span>
            <Link href="/fr" className={styles.langLink}>FR</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;