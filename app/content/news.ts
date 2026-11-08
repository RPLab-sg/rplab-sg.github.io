import type { NewsItem } from './types';

export const news: NewsItem[] = [
  {
    id: '2026-radai-grand-prize',
    slug: '2026-radai-grand-prize',
    status: 'published',
    publishedAt: '2026',
    category: 'award',
    title: {
      ko: '지도팀 RADAI, 2026 AI·SW중심대학 디지털 경진대회 SW부문 대상 수상',
      en: 'Advised team RADAI wins the Grand Prize in the SW Track at the 2026 AI·SW-Centered University Digital Competition',
    },
    detail: {
      ko: '부총리 겸 과학기술정보통신부장관상',
      en: 'Minister of Science and ICT Award',
    },
    summary: {
      ko: '서강대학교 RADAI 팀이 AI·SW중심대학협의회가 주최한 2026 AI·SW중심대학 디지털 경진대회 SW부문에서 대상(부총리 겸 과학기술정보통신부장관상)을 받았습니다.',
      en: "Sogang University's team RADAI received the Grand Prize (Minister of Science and ICT Award) in the SW Track of the 2026 AI·SW-Centered University Digital Competition, hosted by the AI·SW-Centered University Council.",
    },
    body: { ko: [], en: [] },
  },
  {
    id: '2025-seocho-grand-prize',
    slug: '2025-seocho-grand-prize',
    status: 'published',
    publishedAt: '2025',
    category: 'award',
    title: {
      ko: '지도팀 서강로보틱스, 2025 서초 AI·로봇 공공서비스 공모전 대상 수상',
      en: 'Advised team Sogang Robotics wins the Grand Prize at the 2025 Seocho AI·Robot Public Service Contest',
    },
    detail: { ko: '서초구청장상', en: "Seocho District Mayor's Award" },
    summary: {
      ko: '연구실 지도팀 서강로보틱스가 2025 서초 AI·로봇 공공서비스 공모전에서 대상(서초구청장상)을 받았습니다.',
      en: "Sogang Robotics, a team advised by the lab, received the Grand Prize (Seocho District Mayor's Award) at the 2025 Seocho AI·Robot Public Service Contest.",
    },
    body: { ko: [], en: [] },
  },
];
