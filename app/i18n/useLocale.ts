import { useLocation } from 'react-router';
import { getLocaleFromPath, type Locale } from './locale';

export function useLocale(): Locale {
  return getLocaleFromPath(useLocation().pathname);
}
