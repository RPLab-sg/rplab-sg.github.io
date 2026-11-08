import type { ReactNode } from 'react';
import { scrollToSection } from '@/lib/smoothScroll';
import { SlotLink } from './SlotLink';
import styles from './PillButton.module.css';

interface Props {
  to: string;
  children: ReactNode;
  variant?: 'tonal' | 'filled';
}

export function PillButton({ to, children, variant = 'filled' }: Props) {
  const className = `${styles.button} ${styles[variant]}`;
  const content = <span>{children}</span>;
  if (to.startsWith('#')) {
    return (
      <a href={to} className={className} onClick={(e) => scrollToSection(e, to.slice(1))}>
        {content}
      </a>
    );
  }
  return (
    <SlotLink href={to} className={className}>
      {content}
    </SlotLink>
  );
}
