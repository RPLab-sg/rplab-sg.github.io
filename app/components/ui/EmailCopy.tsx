import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { Icon } from './Icon';
import styles from './EmailCopy.module.css';

export function useCopyEmail(email: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

export function CopiedNote({ copied, locale }: { copied: boolean; locale: Locale }) {
  return (
    <span className={styles.note} data-visible={copied} role="status">
      {copied ? ui('copied', locale) : ''}
    </span>
  );
}

export function EmailWithCopy({
  email,
  locale,
  className,
  iconSize = 18,
}: {
  email: string;
  locale: Locale;
  className?: string;
  iconSize?: number;
}) {
  const { copied, copy } = useCopyEmail(email);
  return (
    <span className={styles.row}>
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
      <span className={styles.anchor}>
        <button
          type="button"
          className={styles.button}
          onClick={copy}
          aria-label={`${email} — ${ui('copyEmail', locale)}`}
        >
          <Icon name={copied ? 'check' : 'contentCopy'} size={iconSize} />
        </button>
        <CopiedNote copied={copied} locale={locale} />
      </span>
    </span>
  );
}
