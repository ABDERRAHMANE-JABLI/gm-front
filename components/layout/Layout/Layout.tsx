import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import { Language } from '@/lib/i18n';

interface LayoutProps {
  children: React.ReactNode;
  language?: Language;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  language = 'fr',
  className = '',
}) => {
  const mainClasses = [styles.main, className].filter(Boolean).join(' ');

  return (
    <div className={styles.layout}>
      <Header language={language} />
      <main className={mainClasses}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
