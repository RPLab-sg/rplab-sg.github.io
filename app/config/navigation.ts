import type { Localized } from '@/i18n/locale';

export interface NavItem {
  path: string;
  label: Localized;
  shortLabel?: Localized;
}

export const navigation: NavItem[] = [
  { path: '/research', label: { ko: '연구', en: 'Research' } },
  {
    path: '/outputs',
    label: { ko: '성과', en: 'Research Outputs' },
    shortLabel: { ko: '성과', en: 'Outputs' },
  },
  { path: '/people', label: { ko: '구성원', en: 'People' } },
  { path: '/news', label: { ko: '소식', en: 'News' } },
  { path: '/contact', label: { ko: '문의', en: 'Contact' } },
];
