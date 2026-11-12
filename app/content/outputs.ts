import type { Output } from './types.ts';

export const outputs: Output[] = [
  {
    id: 'fsta-edu-sdk',
    slug: 'fsta-edu-sdk',
    status: 'published',
    year: 2026,
    type: 'collaboration',
    title: { ko: 'FSTA Edu SDK', en: 'FSTA Edu SDK' },
    subtitle: { ko: '교육용 레이더 SDK 소프트웨어', en: 'Educational radar SDK software' },
    tag: {
      ko: '레이더 교육 · 산학 협력',
      en: 'Radar Education · Industry Collaboration',
    },
    shortTag: { ko: 'Radar · Education', en: 'Radar · Education' },
    description: {
      ko: '레이더 신호처리를 직접 익히고 응용을 만들어 볼 수 있는 교육용 레이더 SDK 소프트웨어입니다.',
      en: 'Educational radar SDK software for learning radar signal processing and building applications hands-on.',
    },
    featured: true,
    featuredOrder: 1,
    image: {
      src: '/images/projects/fsta-edu-sdk.jpg',
      alt: {
        ko: 'FSTA Edu SDK 화면: 레이더로 추적한 사람의 위치와 자세를 3D와 평면도로 표시',
        en: 'FSTA Edu SDK showing people tracked by radar in 3D and floor-plan views',
      },
    },
  },
  {
    id: 'connecteve-advisory',
    slug: 'connecteve-advisory',
    status: 'published',
    type: 'collaboration',
    year: 2026,
    title: {
      ko: '코넥티브 · AI 기반 정형외과 수술로봇 자문',
      en: 'Connecteve · AI Orthopedic Surgical Robotics Advisory',
    },
    subtitle: {
      ko: '근골격계(MSK) Physical AI 플랫폼 기술 자문',
      en: 'Technical advisory for a musculoskeletal (MSK) Physical AI platform',
    },
    tag: {
      ko: '수술로봇 · 기술 자문',
      en: 'Surgical Robotics · Technical Advisory',
    },
    shortTag: { ko: 'Surgical Robotics · Advisory', en: 'Surgical Robotics · Advisory' },
    description: {
      ko: 'AI·로봇 융합 기반 정형외과 메디테크 기업 코넥티브 자문 교수로 참여해 AI 기반 정형외과 수술로봇과 MSK 데이터 플랫폼 개발을 자문합니다.',
      en: 'Prof. Jinho Son advises Connecteve on AI-driven orthopedic surgical robots and its MSK data platform, and delivered the closing remarks at CONNECTEVE PRESS DAY 2026.',
    },
    featured: true,
    featuredOrder: 2,
    image: {
      src: '/images/projects/connecteve.webp',
      alt: {
        ko: 'CONNECTEVE',
        en: 'CONNECTEVE',
      },
    },
  },
];
