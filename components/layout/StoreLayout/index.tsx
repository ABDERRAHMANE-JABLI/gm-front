'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GMLogo       from '@/public/icons/GaultMillau.svg';
import MoroccoFlag  from '@/public/icons/flag-morocco.svg';
import HomeIcon       from '@/public/icons/menu/home.svg';
import BlogIcon       from '@/public/icons/menu/blog.svg';
import RestaurantIcon from '@/public/icons/menu/restaurant.svg';
import HotelIcon      from '@/public/icons/menu/hotel.svg';
import ArtisanIcon    from '@/public/icons/menu/artisan.svg';
import StoreIcon      from '@/public/icons/store.svg';
import Footer from '@/components/layout/Footer/Footer';
import { useCartContext } from '@/lib/context/CartContext';
import styles from './StoreLayout.module.css';
import { CartItem } from '@/types/Store';
import { ReactNode } from 'react';

// ── Icons ─────────────────────────────────────────────────────────────────────

function PartnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" {...props}>
      <rect width="44" height="44" rx="12" fill="#F5ECD7"/>
      <text x="22" y="29" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#B8860B">&amp;</text>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

//  Burger items (même liste que Header) 

const BURGER_ITEMS = [
  { label: 'La Place',     segment: '',            Icon: HomeIcon,       noBg: true },
  { label: 'Actualités',   segment: 'blogs',       Icon: BlogIcon,       noBg: false },
  { label: 'Restaurants',  segment: 'restaurants', Icon: RestaurantIcon, noBg: false },
  { label: 'Hôtels & Riads', segment: 'hotels',    Icon: HotelIcon,      noBg: false },
  { label: 'Artisans',     segment: 'artisans',    Icon: ArtisanIcon,    noBg: false },
  { label: 'Partenaires',  segment: 'partners',    Icon: PartnerIcon,    noBg: true },
  { label: 'E-Boutique',   segment: 'store',       Icon: StoreIcon,      noBg: true },
];

// ── Inner header ──────────────────────────────────────────────────────────────

function StoreHeaderInner({ lang }: { lang: string }) {
  const { items, removeItem, totalCount, totalPrice } = useCartContext();
  const pathname      = usePathname();
  const segments      = pathname.split('/').filter(Boolean);
  const activeSegment = segments[1] ?? '';

  const [menuOpen, setMenuOpen]     = useState(false);
  const [cartOpen, setCartOpen]     = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <Link href={`/${lang}/store`} className={styles.logoLink}>
            <span className={styles.logoIconWrapper}>
              <StoreIcon width={36} height={36} />
            </span>
            <div className={styles.logoText}>
              <span className={styles.logoBrand}>
                <MoroccoFlag width={26} height={26} />
                <GMLogo width={110} height={28} />
              </span>
              <span className={styles.logoSection}>G&amp;M Store</span>
            </div>
          </Link>

          <div className={styles.actions}>

            {/* ── Cart dropdown ── */}
            <div className={styles.cartWrapper}>
              <button
                className={styles.iconBtn}
                onClick={() => setCartOpen(v => !v)}
                aria-label="Panier"
                aria-expanded={cartOpen}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
              </button>

              {cartOpen && (
                <>
                  <div className={styles.cartBackdrop} onClick={() => setCartOpen(false)} />
                  <div className={styles.cartDropdown}>
                    <div className={styles.cartDropdownHeader}>
                      <span className={styles.cartDropdownTitle}>
                        Panier
                        {totalCount > 0 && <span className={styles.cartDropdownCount}>{totalCount}</span>}
                      </span>
                      <button className={styles.cartDropdownClose} onClick={() => setCartOpen(false)} aria-label="Fermer">
                        <CloseIcon />
                      </button>
                    </div>

                    <div className={styles.cartDropdownItems}>
                      {items.length === 0 ? (
                        <p className={styles.cartDropdownEmpty}>Votre panier est vide.</p>
                      ) : (
                        items.map((item: CartItem) => (
                          <div key={item.award.id} className={styles.cartDropdownItem}>
                            <div className={styles.cartDropdownThumb}>
                              {item.award.thumbUrl
                                // eslint-disable-next-line @next/next/no-img-element
                                ? <img src={item.award.thumbUrl} alt={item.award.title} />
                                : null
                              }
                            </div>
                            <div className={styles.cartDropdownInfo}>
                              <p className={styles.cartDropdownItemTitle}>{item.award.title}</p>
                              <p className={styles.cartDropdownItemMeta}>
                                {item.quantity} × {item.award.price.toLocaleString('fr-FR')} MAD
                              </p>
                            </div>
                            <button
                              className={styles.cartDropdownRemove}
                              onClick={() => removeItem(item.award.id)}
                              aria-label="Retirer"
                            >×</button>
                          </div>
                        ))
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className={styles.cartDropdownFooter}>
                        <div className={styles.cartDropdownTotal}>
                          <span className={styles.cartDropdownTotalLabel}>Total</span>
                          <span className={styles.cartDropdownTotalAmount}>
                            {totalPrice.toLocaleString('fr-FR')} <small>MAD</small>
                          </span>
                        </div>
                        <Link
                          href={`/${lang}/store/order`}
                          className={styles.cartDropdownOrder}
                          onClick={() => setCartOpen(false)}
                        >
                          <span className={styles.cartDropdownOrderLabel}>Commander maintenant</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Burger ── */}
            <button
              className={styles.iconBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
                <rect width="20" height="2" rx="1" fill="currentColor"/>
                <rect y="6" width="20" height="2" rx="1" fill="currentColor"/>
                <rect y="12" width="20" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile menu (même structure que Header) ── */}
      {menuOpen && (
        <>
          <div className={styles.mobileMenuBackdrop} onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Menu principal">

            <div className={styles.mobileMenuHeader}>
              <GMLogo width={180} height={27} />
              <button className={styles.mobileCloseBtn} onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">
                <CloseIcon />
              </button>
            </div>

            <nav className={styles.mobileMenuGrid}>
              {BURGER_ITEMS.map(({ label, segment, Icon, noBg }) => {
                const href     = `/${lang}${segment ? `/${segment}` : ''}`;
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

          </div>
        </>
      )}
    </>
  );
}

// ── StoreLayout ───────────────────────────────────────────────────────────────

interface Props {
  children: ReactNode;
  lang: string;
}

export default function StoreLayout({ children, lang }: Props) {
  return (
    <div className={styles.layout}>
      <StoreHeaderInner lang={lang} />
      <main className={styles.main}>{children}</main>
      <Footer lang={lang as 'fr' | 'en'} />
    </div>
  );
}
