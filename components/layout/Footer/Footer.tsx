import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

/**
 * Footer component for Gault&Millau website
 */
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(' ');

  return (
    <footer className={footerClasses}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo Section */}
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Gault&Millau</span>
            </div>
            <p className={styles.description}>
              Le guide gastronomique de référence depuis 1972
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><Link href="/fr/restaurants" className={styles.link}>Restaurants</Link></li>
              <li><Link href="/fr/chefs" className={styles.link}>Chefs</Link></li>
              <li><Link href="/fr/recettes" className={styles.link}>Recettes</Link></li>
              <li><Link href="/fr/actualites" className={styles.link}>Actualités</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Services</h4>
            <ul className={styles.linkList}>
              <li><Link href="/fr/guide" className={styles.link}>Guide Gault&Millau</Link></li>
              <li><Link href="/fr/abonnement" className={styles.link}>Abonnement</Link></li>
              <li><Link href="/fr/partenaires" className={styles.link}>Partenaires</Link></li>
              <li><Link href="/fr/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Informations</h4>
            <ul className={styles.linkList}>
              <li><Link href="/fr/mentions-legales" className={styles.link}>Mentions légales</Link></li>
              <li><Link href="/fr/politique-confidentialite" className={styles.link}>Politique de confidentialité</Link></li>
              <li><Link href="/fr/cookies" className={styles.link}>Cookies</Link></li>
              <li><Link href="/fr/conditions-utilisation" className={styles.link}>Conditions d&apos;utilisation</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2024 Gault&Millau. Tous droits réservés.
          </p>
          <div className={styles.social}>
            <Link href="#" className={styles.socialLink}>Facebook</Link>
            <Link href="#" className={styles.socialLink}>Twitter</Link>
            <Link href="#" className={styles.socialLink}>Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;