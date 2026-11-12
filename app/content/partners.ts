import type { Partner } from './types';

export const partners: Partner[] = [
  {
    id: 'sogang-startup',
    order: 1,
    name: { ko: '서강대학교 창업지원단', en: 'Sogang Initiative Group of Entrepreneurship' },
    logo: '/images/partners/sogang-startup.png',
    width: 176,
    height: 64,
  },
  {
    id: 'sogang-industry-foundation',
    order: 2,
    name: { ko: '서강대학교 산학협력단', en: 'Sogang Industry University Cooperation Foundation' },
    logo: '/images/partners/sogang-industry-foundation.png',
    width: 204,
    height: 44,
  },
  {
    id: 'connecteve',
    order: 3,
    name: { ko: '코넥티브', en: 'Connecteve' },
    logo: '/images/partners/connecteve.png',
    width: 256,
    height: 44,
  },
];
