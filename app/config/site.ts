import type { Locale, Localized } from '@/i18n/locale';
import { pick } from '@/i18n/locale';

export const site = {
  name: 'RPLab',
  fullName: 'Robot Platform Laboratory',
  description: {
    ko: '로봇, 센서, 융합 설계를 연구하는 서강대학교 컴퓨터공학과 RPLab입니다.',
    en: 'RPLab at Sogang University researches robotics, sensors and integrated design.',
  } satisfies Localized,
  email: 'jinhoson@sogang.ac.kr',
  phone: '02-705-8497',
  address: {
    ko: '서울특별시 마포구 백범로 35\n서강대학교 김대건관 226호',
    en: 'K226, Kim Dae-gun Hall, Sogang University\n35 Baekbeom-ro, Mapo-gu, Seoul 04107, Korea',
  } satisfies Localized,
  addressOneLine: {
    ko: '서울특별시 마포구 백범로 35 서강대학교 김대건관 226호',
    en: 'Office K226 · Kim Dae-gun Hall, Sogang University, Seoul',
  } satisfies Localized,
  footerAddress:
    'K226, Kim Dae-gun Hall, Sogang University, 35 Baekbeom-ro, Mapo-gu, Seoul 04107, Korea',
  mapQuery: {
    ko: '서강대학교 김대건관',
    en: 'Kim Dae-gun Hall, Sogang University, Seoul',
  } satisfies Localized,
} as const;

export function mapEmbedUrl(locale: Locale): string {
  const params = new URLSearchParams({
    q: pick(site.mapQuery, locale),
    hl: locale,
    z: '17',
    output: 'embed',
  });
  return `https://www.google.com/maps?${params.toString()}`;
}

export function pageMeta(title: string | undefined, locale: Locale) {
  const pageTitle = title ? `${title} | ${site.name}` : `${site.name} · ${site.fullName}`;
  const description = pick(site.description, locale);
  return [
    { title: pageTitle },
    { name: 'description', content: description },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale === 'ko' ? 'ko_KR' : 'en_US' },
  ];
}
