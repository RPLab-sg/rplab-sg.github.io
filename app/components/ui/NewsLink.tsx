import type { ReactNode } from 'react';
import styles from './NewsLink.module.css';

export function NewsLink({
  href,
  className,
  children,
}: {
  href: string | undefined;
  className: string;
  children: ReactNode;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a
      className={`${className} ${styles.link}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
