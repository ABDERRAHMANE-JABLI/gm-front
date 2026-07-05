"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Language, useClientTranslation } from '@/lib/i18n/client';

import HomeIcon       from '@/public/icons/menu/home.svg';
import BlogIcon       from '@/public/icons/menu/blog.svg';
import RestaurantIcon from '@/public/icons/menu/restaurant.svg';
import HotelIcon      from '@/public/icons/menu/hotel.svg';
import ArtisanIcon    from '@/public/icons/menu/artisan.svg';
import PeopleIcon     from '@/public/icons/menu/people.svg';
import StoreIcon      from '@/public/icons/store.svg';
import GMLogo         from '@/public/icons/GaultMillau.svg';
import MoroccoFlag    from '@/public/icons/flag-morocco.svg';

interface NavItem {
  label: string;
  segment: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  noBg?: boolean; // icon sans fond coloré intégré
}

type T = (key: string) => string;

function buildNavItems(t: T): NavItem[] {
  return [
    { label: t('navigation.la_place'),  segment: '',            Icon: HomeIcon,       noBg: true },
    { label: t('navigation.actualites'), segment: 'blogs',      Icon: BlogIcon },
    { label: t('common.restaurants'),   segment: 'restaurants', Icon: RestaurantIcon },
    { label: t('common.hotels'),        segment: 'hotels',      Icon: HotelIcon },
    { label: t('common.artisans'),      segment: 'artisans',    Icon: ArtisanIcon },
    { label: t('footer.partners'),     segment: 'partners',    Icon: PartnerIcon,    noBg: true },
    { label: 'E-Boutique',             segment: 'store',    Icon: StoreIcon,      noBg: true },
  ];
}

function buildBurgerItems(t: T): NavItem[] {
  return buildNavItems(t);
}

interface HeaderProps {
  language?: Language;
}

function FrenchFlag() {
  return (
    <MoroccoFlag width="28" height="24" />
  );
}

function BurgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
      <rect width="20" height="2" rx="1" fill="currentColor" />
      <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
      <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function PartnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="44" height="44" rx="12" fill="#F5ECD7"/>
      <text x="22" y="29" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#B8860B">&amp;</text>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const LANGUAGES = [
  { code: 'fr', label: 'FR - Français' },
  { code: 'en', label: 'EN - English' },
] as const;

export default function Header({ language = 'fr' }: HeaderProps) {
  const { t }       = useClientTranslation(language);
  const NAV_ITEMS   = buildNavItems(t);
  const BURGER_ITEMS = buildBurgerItems(t);

  const pathname      = usePathname();
  const segments      = pathname.split('/').filter(Boolean);
  const activeSegment = segments[1] ?? '';
  const [menuOpen, setMenuOpen]     = useState(false);
  const [langOpen, setLangOpen]     = useState(false);

  useEffect(() => { setMenuOpen(false); setLangOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Pages accessibles en direct mais absentes du menu → item synthétique pour l'en-tête
  const extraItem: NavItem | undefined =
    activeSegment === 'contact'
      // /contact : on réutilise l'icône Partenaires
      ? { label: t('footer.partners'), segment: 'contact', Icon: PartnerIcon, noBg: true }
      : activeSegment === 'peoples'
        ? { label: t('common.people'), segment: 'peoples', Icon: PeopleIcon }
        : undefined;

  const activeItem   = NAV_ITEMS.find((item) => item.segment === activeSegment || item.segment === activeSegment + 's')
    ?? extraItem;
  const sectionLabel = activeItem?.label.toUpperCase() ?? '';
  const isHome       = activeSegment === '';
  const LogoIcon     = isHome ? GMLogo : (activeItem?.Icon ?? GMLogo);

  return (
    <>
      <header className={styles.header}>

        {/* ── Top bar ── */}
        <div className={styles.topBar}>
          <Link href={`/${language}`} className={styles.logoLink} aria-label="Gault&Millau accueil">
            {isHome ? (
              <>
                <MoroccoFlag className={styles.homeFlag} />
                <GMLogo className={styles.homeGMLogo} />
              </>
            ) : (
              <>
                <span className={styles.logoIconWrapper}>
                  <LogoIcon width={36} height={36} className={styles.logoImg} />
                </span>
                <div className={styles.logoText}>
                  <span className={styles.logoBrand}>
                    <MoroccoFlag width={28} height={28}/>
                    <GMLogo />
                  </span>
                  {sectionLabel && <span className={styles.logoSection}>{sectionLabel}</span>}
                </div>
              </>
            )}
          </Link>

          <div className={styles.topActions}>

            {/* ── Language selector ── onClick={() => setLangOpen((v) => !v)} */}
            <div className={styles.langSelector}>
              <button
                className={styles.langCode}
                aria-expanded={langOpen}
                aria-label="Changer de langue"
              >
                {language.toUpperCase()}
                {/*<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden style={{ marginLeft: 3 }}>
                  <path d={langOpen ? 'M1 5L5 1L9 5' : 'M1 1L5 5L9 1'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>*/}
              </button>
              {langOpen && (
                <>
                  <div className={styles.langBackdrop} onClick={() => setLangOpen(false)} />
                  <div className={styles.langDropdown}>
                    {LANGUAGES.map(({ code, label }) => {
                      const href = '/' + code + (segments.slice(1).length ? '/' + segments.slice(1).join('/') : '');
                      return (
                        <Link
                          key={code}
                          href={href}
                          className={`${styles.langOption} ${code === language ? styles.langOptionActive : ''}`}
                          onClick={() => setLangOpen(false)}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <FrenchFlag />
            <button
              className={styles.burgerBtn}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <BurgerIcon />
            </button>
          </div>
        </div>

        {/* ── Nav icons ── */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ label, segment, Icon, noBg }) => {
              const href     = `/${language}${segment ? `/${segment}` : ''}`;
              const isActive = segment === activeSegment || segment === activeSegment + 's';

              return (
                <li key={segment} className={styles.navItem}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  >
                    <span className={`${styles.iconWrapper} ${noBg ? styles.iconWrapperNoBg : ''}`}>
                      <Icon
                        width={noBg ? 32 : 44}
                        height={noBg ? 32 : 44}
                        className={styles.navIcon}
                      />
                    </span>
                    <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
                      {label.toUpperCase()}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </header>

      {/* Réserve la hauteur du header (désormais position: fixed) */}
      <div className={styles.headerSpacer} aria-hidden="true" />

      {/* ── Mobile menu overlay ── */}
      {menuOpen && (
        <>
          <div className={styles.mobileMenuBackdrop} onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Menu principal">

          {/* Header du menu */}
          <div className={styles.mobileMenuHeader}>
            <GMLogo width={180} height={27} />
            <button
              className={styles.mobileCloseBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Grille des liens */}
          <nav className={styles.mobileMenuGrid}>
            {BURGER_ITEMS.map(({ label, segment, Icon, noBg }) => {
              const href     = `/${language}${segment ? `/${segment}` : ''}`;
              const isActive = segment === activeSegment || segment === activeSegment + 's';
              return (
                <Link
                  key={segment}
                  href={href}
                  className={`${styles.mobileMenuItem} ${isActive ? styles.mobileMenuItemActive : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={`${styles.mobileIconWrapper} ${noBg ? styles.mobileIconWrapperNoBg : ''}`}>
                    <Icon width={44} height={44} />
                  </span>
                  <span className={styles.mobileItemLabel}>{label.toUpperCase()}</span>
                </Link>
              );
            })}
          </nav>

          {/* Infos footer */}
          <div className={styles.mobileMenuFooter}>
            <div className={styles.mobileMenuFooterCol}>
              <p className={styles.mobileMenuFooterTitle}>{t('footer.contact_title')}</p>
              <address className={styles.mobileMenuAddress}>
                81 BD Moulay Hassan I,<br />
                6<sup>e</sup> étage,<br />
                Casablanca, Maroc
              </address>
              <a href="tel:+212664082188" className={styles.mobileMenuPhone}>+212 6 64 08 21 88</a>
            </div>
            <div className={styles.mobileMenuFooterCol}>
              <Link href={`/${language}/contact`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>{t('footer.contact_us')}</Link>
              <Link href={`/${language}/info/mot-du-president`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>{t('footer.president')}</Link>
              <Link href={`/${language}/info/kit-media`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>{t('footer.kit_media')}</Link>
            </div>
          </div>

        </div>
        </>
      )}
    </>
  );
}
