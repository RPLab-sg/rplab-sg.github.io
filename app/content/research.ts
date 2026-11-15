import type { ResearchAxis } from './types';

export const researchAxes: ResearchAxis[] = [
  {
    id: 'robotics',
    order: 1,
    title: 'Robotics',
    images: [
      {
        src: '/images/research/robotics-wearable-logistics.jpg',
        alt: {
          ko: '물류 창고에서 웨어러블 로봇을 착용한 작업자와 LG 서비스 로봇',
          en: 'A worker wearing a wearable robot alongside an LG service robot in a warehouse',
        },
      },
      {
        src: '/images/research/robotics-cloi-platform-day.jpg',
        alt: { ko: 'LG CLOi 플랫폼 데이 단체 사진', en: 'Group photo at LG CLOi Platform Day' },
      },
      {
        src: '/images/research/robotics-cloi-lineup.jpg',
        alt: {
          ko: 'LG CLOi 로봇 라인업: 홈, 청소, 안내, 포터 로봇과 에어스타',
          en: 'LG CLOi robot lineup: home, cleaning, guide and porter robots and Airstar',
        },
      },
    ],
    summary: {
      ko: 'Physical AI를 중심으로\n로봇의 구조와 움직임을 연구합니다.',
      en: 'Exploring the structure and motion of robots,\nwith a focus on Physical AI',
    },
    keywords: {
      ko: ['웨어러블 로봇', 'AI 기반 수술로봇', '산업 로봇·AI 응용'],
      en: ['Wearable Robots', 'AI Surgical Robotics', 'Industrial Robotics & AI'],
    },
    body: {
      ko: [
        'RPLab은 실제 환경에서 인지하고 판단해 움직이는 Physical AI 로봇을 연구합니다. 로봇의 기구 설계와 제어, 그리고 이를 움직이는 AI를 따로 떼어 보지 않고 하나의 시스템으로 다룹니다.',
        '로봇이 사람 곁에서 일하려면 정확하게 움직이는 것만큼 안전하고 자연스럽게 상호작용하는 것이 중요합니다. 연구실은 사람과 함께 움직이고 협력하는 로봇의 설계와 제어 방법을 연구합니다.',
        '연구는 의료, 산업, 일상생활 등 현장의 문제에서 출발합니다. 실험실의 결과가 실제로 쓰일 수 있도록, 문제를 정의하는 단계부터 현장 검증까지 함께 고민합니다.',
      ],
      en: [
        'RPLab studies Physical AI, the work of making robots perceive, decide and move on their own in the real world. We treat a robot’s structure and motion, the way it is controlled, and the AI that makes its decisions as one system rather than separate parts.',
        'For robots to work alongside people, safe and natural interaction matters as much as precise motion. We study how to design and control robots that move and collaborate with people.',
        'Our research starts from real problems in healthcare, industry and everyday life. To make lab results usable in practice, we stay involved from defining the problem through validation in the field.',
      ],
    },
  },
  {
    id: 'sensors',
    order: 2,
    title: 'Sensors',
    images: [
      {
        src: '/images/research/sensors-vehicle-radar.jpg',
        alt: {
          ko: '레이더 센서로 주변을 감지하는 자동차 일러스트',
          en: 'Illustration of a car sensing its surroundings with radar',
        },
      },
      {
        src: '/images/research/sensors-smart-radar-system.jpg',
        alt: {
          ko: '자동차, 드론, 병원, 가정 등 도시 곳곳에 쓰이는 스마트 레이더 시스템 일러스트',
          en: 'Illustration of a smart radar system used across a city, from cars and drones to hospitals and homes',
        },
      },
    ],
    summary: {
      ko: '다양한 센서 신호를 처리하고 결합해\n사람과 환경을 인지하는 기술을 연구합니다.',
      en: 'We study how to process and combine sensor signals\nto perceive people and their surroundings.',
    },
    keywords: {
      ko: ['레이더 센싱', '신호처리', '사람 위치·자세 추적'],
      en: ['Radar Sensing', 'Signal Processing', 'Human Position & Posture Tracking'],
    },
    body: {
      ko: [
        '센서는 로봇과 시스템이 주변 환경을 인지하는 출발점입니다. 연구실은 다양한 센서로 물리적 변화를 측정하고, 잡음 속에서 의미 있는 정보를 추출하는 신호처리 기법을 연구합니다.',
        '서로 다른 센서의 장단점을 보완하도록 신호를 결합해, 사람과 사물의 위치와 움직임, 주변 상황을 더 정확하게 파악하는 방법을 다룹니다.',
      ],
      en: [
        'Sensors are where perception begins for robots and systems. We measure physical change through a range of sensors and develop signal processing methods that extract meaningful information from noise.',
        'By combining signals so that different sensors make up for each other’s limits, we work toward a more accurate picture of where people and objects are, how they move, and what is happening around them',
      ],
    },
  },
  {
    id: 'integrated-design',
    order: 3,
    title: 'Integrated Design',
    images: [
      {
        src: '/images/research/integrated-design-hanwha-robotics.jpg',
        alt: {
          ko: '한화로보틱스 방문 단체 사진',
          en: 'Group photo during a visit to Hanwha Robotics',
        },
      },
      {
        src: '/images/research/integrated-design-angel-robotics-listing.jpg',
        alt: {
          ko: '2024년 3월 26일 엔젤로보틱스 코스닥 상장식',
          en: 'Angel Robotics KOSDAQ listing ceremony on March 26, 2024',
        },
      },
    ],
    summary: {
      ko: '로봇, 센서, 소프트웨어를 하나의 시스템으로 통합하고\n실제 환경에서 검증하는 설계 방법을 연구합니다.',
      en: 'We study how to integrate robots, sensors and software\ninto one system and validate it in real environments.',
    },
    keywords: {
      ko: ['캡스톤디자인', '프로토타이핑', '시스템 통합'],
      en: ['Capstone Design', 'Prototyping', 'System Integration'],
    },
    body: {
      ko: [
        '개별 기술이 뛰어나도 하나의 시스템으로 묶였을 때 제대로 작동하는 것은 별개의 문제입니다. 연구실은 로봇과 센서, 소프트웨어를 함께 설계하고 통합하는 방법을 연구하며, 시제품을 실제 환경에서 검증해 설계로 다시 반영합니다.',
        '캡스톤디자인과목과 연계해 학부생이 연구실의 문제를 함께 정의하고 시스템을 만들도록 지원하며, 그 결과는 공모전 수상 등 외부 성과로 이어지고 있습니다.',
      ],
      en: [
        'Strong individual components do not guarantee a system that works as a whole. We study how to co-design and integrate robots, sensors and software, and validate prototypes in real environments to feed results back into the design.',
        'This work connects with Capstone Design. Undergraduates help define the lab’s problems and build systems with us, and their results have led to outcomes such as competition awards.',
      ],
    },
  },
];
