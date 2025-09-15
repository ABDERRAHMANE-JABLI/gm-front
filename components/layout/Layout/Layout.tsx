import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import { Language } from '@/lib/i18n';

interface LayoutProps {
  /**
   * Page content to be wrapped
   */
  children: React.ReactNode;
  /**
   * Current language
   */
  language?: Language;
  /**
   * Custom header props
   */
  headerProps?: React.ComponentProps<typeof Header>;
  /**
   * Custom footer props
   */
  footerProps?: React.ComponentProps<typeof Footer>;
  /**
   * Hide header
   */
  hideHeader?: boolean;
  /**
   * Hide footer
   */
  hideFooter?: boolean;
  /**
   * Additional CSS classes for main content
   */
  className?: string;
}

/**
 * Main layout wrapper component that includes Header and Footer
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  language = 'fr',
  headerProps,
  footerProps,
  hideHeader = false,
  hideFooter = false,
  className = '',
}) => {
  const mainClasses = [styles.main, className].filter(Boolean).join(' ');

  return (
    <div className={styles.layout}>
      {!hideHeader && <Header language={language} {...headerProps} />}
      
      <main className={mainClasses}>
        {children}
      </main>
      
      {!hideFooter && <Footer {...footerProps} />}
    </div>
  );
};

export default Layout;
