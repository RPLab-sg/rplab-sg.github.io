import type { MemberRole, NewsCategory, OutputType } from '@/content/types';
import type { Localized } from '@/i18n/locale';

export const newsCategoryLabels: Record<NewsCategory, Localized> = {
  award: { ko: '수상', en: 'Award' },
  research: { ko: '연구', en: 'Research' },
  event: { ko: '행사', en: 'Event' },
  notice: { ko: '공지', en: 'Notice' },
};

export const outputTypeLabels: Record<OutputType, Localized> = {
  'tech-transfer': { ko: '기술이전·특허', en: 'Tech Transfer & Patents' },
  collaboration: { ko: '산학 협력', en: 'Industry Collaboration' },
  paper: { ko: '논문', en: 'Papers' },
  project: { ko: '프로젝트', en: 'Projects' },
};

export const outputFilterOrder: OutputType[] = ['tech-transfer', 'collaboration', 'paper'];

/** Student groups on the People page, in display order. A group with no students is not shown. */
export const studentRoleOrder = ['phd', 'ms', 'undergraduate'] as const satisfies MemberRole[];

export const studentRoleLabels: Record<(typeof studentRoleOrder)[number], Localized> = {
  phd: { ko: '박사과정', en: 'Ph.D. Students' },
  ms: { ko: '석사과정', en: 'M.S. Students' },
  undergraduate: { ko: '학부연구생', en: 'Undergraduate Researchers' },
};
