import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/locale';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './PageLayout.module.css';

export function PageLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header locale={locale} />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
