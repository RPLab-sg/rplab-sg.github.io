import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { localizePath } from '@/i18n/locale';
import { useLocale } from '@/i18n/useLocale';

export function LocalizedLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  return (
    <Link to={localizePath(to, locale)} className={className}>
      {children}
    </Link>
  );
}
