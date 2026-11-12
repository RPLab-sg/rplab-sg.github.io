import type { ReactNode } from 'react';
import styles from './HomeSection.module.css';

export function HomeSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={['container', styles.section, className ?? ''].join(' ')}
      aria-labelledby={id}
      data-reveal-children
    >
      <h2 id={id} className={styles.heading} lang="en">
        {title}
      </h2>
      {children}
    </section>
  );
}
