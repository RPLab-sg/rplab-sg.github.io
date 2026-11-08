import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { isExternalHref, localizePath } from '@/i18n/locale';
import { useLocale } from '@/i18n/useLocale';
import styles from './SlotLink.module.css';

interface Props {
  href?: string | null | undefined;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/** Renders a non-clickable `<a>` until `href` is filled in. */
export function SlotLink({ href, external = false, className, ariaLabel, children }: Props) {
  const locale = useLocale();
  const classes = [className ?? '', href ? '' : styles.pending].join(' ').trim();
  const label = ariaLabel ? { 'aria-label': ariaLabel } : {};

  if (!href) {
    return (
      <a className={classes} aria-disabled="true" data-pending="" {...label}>
        {children}
      </a>
    );
  }
  if (external || isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...label}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={localizePath(href, locale)} className={classes} {...label}>
      {children}
    </Link>
  );
}
