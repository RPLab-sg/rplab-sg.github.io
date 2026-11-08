import type { MetaFunction } from 'react-router';
import { pageMeta } from '@/config/site';
import { getLocaleFromRequest, type Locale } from '@/i18n/locale';

export interface LocaleData {
  locale: Locale;
}

export interface LoaderArgs<P extends string = never> {
  request: Request;
  params: { [K in P]?: string };
}

export function withLocale<T extends object>(request: Request, data: T): T & LocaleData {
  return { locale: getLocaleFromRequest(request), ...data };
}

export function staticMeta(title?: string): MetaFunction<() => Promise<LocaleData>> {
  return ({ loaderData }) => pageMeta(title, loaderData?.locale ?? 'ko');
}
