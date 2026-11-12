export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

export interface Localized<T = string> {
  ko: T;
  en: T;
}

export function pick<T>(value: Localized<T>, locale: Locale): T {
  const picked = value[locale];
  if (typeof picked === 'string' && picked.trim() === '') return value.ko;
  if (Array.isArray(picked) && picked.length === 0) return value.ko;
  return picked;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

export function getLocaleFromRequest(request: Request): Locale {
  return getLocaleFromPath(new URL(request.url).pathname.replace(/\.data$/, ''));
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  if (locale === 'ko') return clean === '' ? '/' : clean;
  return `/en${clean}`;
}

export function stripLocale(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname), target);
}
