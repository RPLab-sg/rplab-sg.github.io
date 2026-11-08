import type { ReactNode } from 'react';
import logo from '@/assets/logo.svg';
import styles from './SubPage.module.css';

export function SubPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <img className={styles.mark} src={logo} alt="" width={80} height={64} />
      </header>
      {children}
    </div>
  );
}

export function SubSection({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={className ?? styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionHeading}>
        {title}
      </h2>
      {children}
    </section>
  );
}
