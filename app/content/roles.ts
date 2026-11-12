import type { Localized } from '../i18n/locale';
import type { MemberRole } from './types';

export const memberPositions: Record<MemberRole, Localized> = {
  professor: {
    ko: '서강대학교 컴퓨터공학과 부교수',
    en: 'Associate Professor, Computer Science and Engineering, Sogang University',
  },
  phd: { ko: '박사과정', en: 'Ph.D. Student' },
  ms: { ko: '석사과정', en: 'M.S. Student' },
  undergraduate: { ko: '학부연구생', en: 'Undergraduate Researcher' },
  alumni: { ko: '졸업생', en: 'Alumni' },
};
