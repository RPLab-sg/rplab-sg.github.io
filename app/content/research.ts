import type { ResearchAxis } from './types';

export const researchAxes: ResearchAxis[] = [
  {
    id: 'robotics',
    order: 1,
    title: 'Robotics',
    summary: {
      ko: '로봇과 AI의 접목을 연구합니다.\n',
      en: 'Exploring the structure and motion of robots,\nwith a focus on Physical AI',
    },
    keywords: {
      ko: ['웨어러블 로봇', 'AI 기반 수술로봇', '산업 로봇·AI 응용'],
      en: ['Wearable Robots', 'AI Surgical Robotics', 'Industrial Robotics & AI'],
    },
    body: {
      ko: [
        'RPLab은 웨어러블 로봇을 중심으로 로봇의 구조와 움직임을 탐구합니다. 사람의 몸과 함께 움직이는 로봇은 정밀한 기구 설계와 안정적인 제어를 동시에 요구하며, 연구실은 이 두 가지를 하나의 시스템으로 다룹니다.',
        'AI 기반 차세대 수술로봇과 산업 현장의 로봇·AI 응용을 연구합니다. 무릎 수술에서 뼈의 형상과 간격을 측정해 수술설계에 실시간으로 반영하는 것처럼, 실제 현장의 문제에서 출발하는 로봇 시스템을 지향합니다.',
      ],
      en: [
        'RPLab explores the structure and motion of robots, with a focus on wearable robotics. Robots that move with the human body demand both precise mechanical design and stable control, and we treat the two as a single system.',
        'We also study AI-based surgical robots and robotics and AI in industry. Like measuring bone geometry and gaps in knee surgery and reflecting them in surgical planning in real time, our robot systems start from real problems in the field.',
      ],
    },
  },
  {
    id: 'sensors',
    order: 2,
    title: 'Sensors',
    summary: {
      ko: '레이더 신호처리로 공간 속\n사람의 위치와 자세를 추적합니다.',
      en: 'Tracking where people are and how they move\nwith radar signal processing.',
    },
    keywords: {
      ko: ['레이더 센싱', '신호처리', '사람 위치·자세 추적'],
      en: ['Radar Sensing', 'Signal Processing', 'Human Position & Posture Tracking'],
    },
    body: {
      ko: [
        '센서는 로봇과 시스템이 세상을 이해하는 감각입니다. 연구실은 물리적 변화를 신호로 읽어 내고, 그 신호를 의미 있는 정보로 바꾸는 과정 전반을 연구합니다.',
        '특히 레이더 기반 센싱과 신호처리로 공간 속 사람과 사물의 위치와 움직임을 파악합니다. 이 연구는 교육용 레이더 소프트웨어인 FSTA Edu SDK로도 이어지고 있습니다.',
      ],
      en: [
        'Sensors are how robots and systems perceive the world. We study the full path from reading physical change as signals to turning those signals into meaningful information.',
        'In particular, we use radar sensing and signal processing to understand the position and movement of people and objects in space. This work also continues in FSTA Edu SDK, our educational radar software.',
      ],
    },
  },
  {
    id: 'integrated-design',
    order: 3,
    title: 'Integrated Design',
    summary: {
      ko: '캡스톤디자인과 연계해 문제를 정의하고 설계·제작하며\n아이디어를 작동하는 결과물로 만듭니다.',
      en: 'Tied to Capstone Design — we define problems,\ndesign, build, and turn ideas into working systems.',
    },
    keywords: {
      ko: ['캡스톤디자인', '프로토타이핑', '시스템 통합'],
      en: ['Capstone Design', 'Prototyping', 'System Integration'],
    },
    body: {
      ko: [
        '융합 설계는 로봇과 센서 연구를 실제로 작동하는 결과물로 묶어 내는 과정입니다. 문제를 정의하고, 설계하고, 직접 제작하며 아이디어를 검증합니다.',
        '캡스톤디자인 과목과 연계해 학부생이 연구실의 문제를 함께 풀고, 그 결과가 공모전 수상과 같은 외부 성과로 이어지도록 지원합니다.',
      ],
      en: [
        'Integrated design brings our robotics and sensing research together into working results. We define problems, design, build, and validate ideas hands-on.',
        "Through Capstone Design, undergraduates work on the lab's problems with us, and we help their results grow into outcomes such as competition awards.",
      ],
    },
  },
];
