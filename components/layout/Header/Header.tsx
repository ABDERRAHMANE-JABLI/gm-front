"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Language } from '@/lib/i18n';

import HomeIcon       from '@/public/icons/menu/home.svg';
import BlogIcon       from '@/public/icons/menu/blog.svg';
import RestaurantIcon from '@/public/icons/menu/restaurant.svg';
import Riyads     from '@/public/icons/menu/winery.svg';
import HotelIcon      from '@/public/icons/menu/hotel.svg';
import ArtisanIcon    from '@/public/icons/menu/artisan.svg';
import RecipeIcon     from '@/public/icons/menu/recipe.svg';
import PeopleIcon     from '@/public/icons/menu/people.svg';
import UtensilIcon    from '@/public/icons/menu/utensil.svg';
import GMLogo         from '@/public/icons/GaultMillau.svg';
import MoroccoFlag    from '@/public/icons/flag-morocco.svg';

interface NavItem {
  label: string;
  segment: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  noBg?: boolean; // icon sans fond coloré intégré
}

const NAV_ITEMS: NavItem[] = [
  { label: 'La Place',    segment: '',            Icon: HomeIcon,       noBg: true },
  { label: 'Actualités',  segment: 'blogs',       Icon: BlogIcon },
  { label: 'Restaurants', segment: 'restaurants', Icon: RestaurantIcon },
  { label: 'Riyad',       segment: 'riyads',      Icon: Riyads },
  { label: 'Hôtels',      segment: 'hotels',      Icon: HotelIcon },
  { label: 'Artisans',    segment: 'artisans',    Icon: ArtisanIcon },
  { label: 'Recettes',    segment: 'recipes',     Icon: RecipeIcon },
  { label: 'People',      segment: 'peoples',     Icon: PeopleIcon },
  { label: 'Ustensiles',  segment: 'utensils',    Icon: UtensilIcon },
];

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

export default function Header({ language = 'fr' }: HeaderProps) {
  const pathname  = usePathname();
  const segments  = pathname.split('/').filter(Boolean);
  const activeSegment = segments[1] ?? '';

  const activeItem   = NAV_ITEMS.find((item) => item.segment === activeSegment);
  const sectionLabel = activeItem?.label.toUpperCase() ?? '';
  const isHome       = activeSegment === '';
  const LogoIcon     = isHome ? GMLogo : (activeItem?.Icon ?? GMLogo);

  return (
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
          <span className={styles.langCode}>{language.toUpperCase()}</span>
          <FrenchFlag />
          <button className={styles.burgerBtn} aria-label="Ouvrir le menu">
            <BurgerIcon />
          </button>
        </div>
      </div>

      {/* ── Nav icons ── */}
      <nav className={styles.nav} aria-label="Navigation principale">
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ label, segment, Icon, noBg }) => {
            const href     = `/${language}${segment ? `/${segment}` : ''}`;
            const isActive = segment === activeSegment;

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
  );
}
