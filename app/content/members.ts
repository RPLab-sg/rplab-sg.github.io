import type { Member } from './types';

export const members: Member[] = [
  {
    id: 'jinho-son',
    slug: 'jinho-son',
    role: 'professor',
    order: 1,
    status: 'published',
    name: { ko: '손진호', en: 'Jinho Son' },
    position: {
      ko: '서강대학교 컴퓨터공학과 부교수',
      en: 'Associate Professor, Computer Science and Engineering, Sogang University',
    },
    summary: {
      ko: 'AI 기반 차세대 수술로봇 시스템과 산업 현장의 로봇 및 AI 응용을 연구합니다. 무릎 수술의 형상 및 간격 측정과 수술설계 자동화를 다룹니다.',
      en: 'Researches AI-based next-generation surgical robot systems and robotics and AI applications in industry, including knee geometry and gap measurement and automated surgical planning.',
    },
    keywords: {
      ko: ['AI 기반 수술로봇', '산업 로봇·AI 응용', 'Ad-hoc 네트워크'],
      en: ['AI Surgical Robotics', 'Industrial Robotics & AI', 'Ad-hoc Networks'],
    },
    email: 'jinhoson@sogang.ac.kr',
    phone: '02-705-8497',
    office: { ko: '김대건관 K226', en: 'K226, Kim Dae-gun Hall' },
    photo: {
      src: '/images/people/jinho-son.jpg',
      alt: { ko: '손진호 교수 사진', en: 'Portrait of Professor Jinho Son' },
    },
    // href가 비어 있으면 링크는 보이지만 아직 눌리지 않습니다. 연결할 때 href만 채우세요.
    links: [
      {
        kind: 'profile',
        label: { ko: '전체 이력 →', en: 'Full profile →' },
        // Internal path; SlotLink adds the /en prefix on the English site.
        href: '/people/jinho-son',
        external: false,
      },
      {
        kind: 'department',
        label: { ko: '학과 프로필 ↗', en: 'Department profile ↗' },
        href: 'https://computing.sogang.ac.kr/ko/education/undergraduate/faculty/MjAyNjA4MjcxNzUxMTc1NTU?dept=computer-science',
        external: true,
      },
      {
        kind: 'tech-transfer',
        label: { ko: '기술이전 프로필 ↗', en: 'Tech transfer profile ↗' },
        href: 'https://www.sogangtech.com/researcher/2342',
        external: true,
      },
    ],
    detail: {
      summary: {
        ko: 'AI 기반 차세대 수술로봇 시스템을 연구합니다. 무릎 뼈 수술 부위의 형상과 대퇴골·경골 사이 간격을 자동으로 측정해 수술 설계에 실시간으로 반영하고, AI로 수술 설계를 자동화해 짧은 시간에 안전하게 뼈를 절삭하는 차세대 무릎인공관절 수술 로봇 시스템을 개발합니다.',
        en: "Researches AI-based next-generation surgical robot systems. Automatically measures the knee's bone geometry and the gap between femur and tibia, reflects them in surgical planning in real time, and develops a knee-arthroplasty robot that automates planning with AI to cut bone safely in less time.",
      },
      research: [
        {
          title: {
            ko: 'AI 기반 차세대 수술로봇 시스템',
            en: 'AI-based Next-generation Surgical Robot Systems',
          },
          body: {
            ko: '인구 고령화로 근골격계 질환 수술 수요가 늘어나는 환경에서, 개인 맞춤형 진단·수술·수술 후 관리를 지원하는 미래 지향형 시스템을 연구합니다. 기존 로봇 인공관절치환술의 한계를 해결하기 위해 무릎 뼈 수술 부위의 형상과 대퇴골(femur)·경골(tibia) 사이 간격을 자동으로 측정해 수술 설계에 실시간으로 반영하는 기술을 개발합니다. 인공지능 프로그램으로 수술 설계를 자동으로 수행하고, 기존 수술 로봇보다 짧은 시간에 안전하게 뼈를 절삭할 수 있는 차세대 무릎인공관절 수술 로봇 시스템을 연구합니다.',
            en: 'As population aging increases demand for musculoskeletal surgery, we research forward-looking systems that support personalized diagnosis, surgery and post-operative care. To overcome the limits of current robotic joint replacement, we develop technology that automatically measures the geometry of the knee and the gap between femur and tibia and reflects it in surgical planning in real time. We study a next-generation knee-arthroplasty robot that automates surgical planning with AI and cuts bone safely in less time than existing surgical robots.',
          },
        },
      ],
      experience: [
        {
          period: { ko: '현재', en: 'Present' },
          title: {
            ko: '서강대학교 컴퓨터공학과 · 부교수',
            en: 'Dept. of Computer Science and Engineering, Sogang University · Associate Professor',
          },
        },
        {
          period: { ko: '2024.11 – 2025.05', en: '2024.11 – 2025.05' },
          title: { ko: '(주)인텔로이드 · 부사장', en: 'Inteloid · Vice President' },
        },
        {
          period: { ko: '2024.05 – 2024.10', en: '2024.05 – 2024.10' },
          title: { ko: '(주)아크릴 · 전무', en: 'Acryl · Executive Vice President' },
        },
        {
          period: { ko: '2021.03 – 2024.04', en: '2021.03 – 2024.04' },
          title: { ko: '(주)엔젤로보틱스 · 이사', en: 'Angel Robotics · Director' },
        },
        {
          period: { ko: '2020.04 – 2021.03', en: '2020.04 – 2021.03' },
          title: { ko: '(주)에스디옵틱스 · 전무', en: 'SD Optics · Executive Vice President' },
        },
        {
          period: { ko: '2017.07 – 2020.02', en: '2017.07 – 2020.02' },
          title: {
            ko: 'LG전자 로봇선행연구소 · 소장(상무)',
            en: 'Robot Advanced Research Lab, LG Electronics · Head (VP)',
          },
          note: { ko: '로봇 연구개발', en: 'Robotics R&D' },
        },
        {
          period: { ko: '2016.01 – 2017.06', en: '2016.01 – 2017.06' },
          title: {
            ko: 'LG전자 인텔리전스연구소 · 소장(상무)',
            en: 'Intelligence Research Lab, LG Electronics · Head (VP)',
          },
          note: { ko: '인공지능 선행연구개발', en: 'Advanced AI R&D' },
        },
        {
          period: { ko: '2011.01 – 2015.12', en: '2011.01 – 2015.12' },
          title: {
            ko: 'LG전자기술원 미래IT융합연구소 · 소장(상무)',
            en: 'Future IT Convergence Lab, LG Electronics Advanced Research Institute · Head (VP)',
          },
          note: { ko: '인공지능 선행연구개발', en: 'Advanced AI R&D' },
        },
        {
          period: { ko: '2001.01 – 2010.12', en: '2001.01 – 2010.12' },
          title: {
            ko: 'LG전자기술원 정보기술연구소',
            en: 'Information Technology Lab, LG Electronics Advanced Research Institute',
          },
          note: { ko: '인공지능 선행연구개발', en: 'Advanced AI R&D' },
        },
        {
          period: { ko: '2001.01 – 2009.12', en: '2001.01 – 2009.12' },
          title: {
            ko: 'LG전자기술원 PAN그룹',
            en: 'PAN Group, LG Electronics Advanced Research Institute',
          },
          note: {
            ko: '근거리 네트워크 기술 개발',
            en: 'Short-range network technology development',
          },
        },
        {
          period: { ko: '2000.01 – 2010.01', en: '2000.01 – 2010.01' },
          title: { ko: 'LG전자 · 수석연구원', en: 'LG Electronics · Principal Research Engineer' },
        },
        {
          period: { ko: '1999.01 – 2000.12', en: '1999.01 – 2000.12' },
          title: {
            ko: 'LG정보통신 차세대통신연구소 · 책임연구원',
            en: 'Next-Generation Telecom Lab, LG Information & Communications · Senior Research Engineer',
          },
          note: { ko: '기지국 장비 소프트웨어 개발', en: 'Base station software development' },
        },
        {
          period: { ko: '1993.04 – 2000.01', en: '1993.04 – 2000.01' },
          title: { ko: 'LG이노텍', en: 'LG Innotek' },
        },
        {
          period: { ko: '1993.01 – 1998.12', en: '1993.01 – 1998.12' },
          title: {
            ko: 'LG정밀 통신연구소 · 선임연구원',
            en: 'Telecom Research Lab, LG Precision · Research Engineer',
          },
          note: { ko: '통신장비(무전기) 개발', en: 'Communication equipment (radio) development' },
        },
      ],
      education: [
        {
          period: { ko: '1999 – 2004', en: '1999 – 2004' },
          title: {
            ko: '성균관대학교 전기전자및컴퓨터공학과 · 박사',
            en: 'Ph.D., Electrical and Computer Engineering, Sungkyunkwan University',
          },
          note: {
            ko: '프로토콜공학 (무선 네트워크 프로토콜 설계)',
            en: 'Protocol engineering (wireless network protocol design)',
          },
        },
        {
          period: { ko: '1991 – 1993', en: '1991 – 1993' },
          title: {
            ko: '성균관대학교 기계공학과 · 석사',
            en: 'M.S., Mechanical Engineering, Sungkyunkwan University',
          },
          note: {
            ko: '파괴역학 (인공지능 기반 파괴역학 설계)',
            en: 'Fracture mechanics (AI-based fracture mechanics design)',
          },
        },
        {
          period: { ko: '1987 – 1991', en: '1987 – 1991' },
          title: {
            ko: '성균관대학교 기계설계학과 · 학사',
            en: 'B.S., Mechanical Design, Sungkyunkwan University',
          },
          note: { ko: '재료역학', en: 'Mechanics of materials' },
        },
      ],
      activities: [
        {
          period: { ko: '2025.10', en: '2025.10' },
          title: {
            ko: '2025 서초 AI·로봇 공공서비스 공모전 대상 (서초구청장상)',
            en: "Grand Prize, 2025 Seocho AI·Robot Public Service Contest (Seocho District Mayor's Award)",
          },
          note: {
            ko: '지도팀 서강로보틱스 · 서초구, 현대차 로봇팀과 단계적 실증·현장 구현 협업 추진',
            en: "Advised team Sogang Robotics · staged field pilots planned with Seocho-gu and Hyundai Motor's robotics team",
          },
        },
        {
          period: { ko: '2025.06 – 2030.02', en: '2025.06 – 2030.02' },
          title: { ko: '서울시 RISE 사업', en: 'Seoul RISE Program' },
          note: {
            ko: 'AI 로봇 분야 글로벌 인재 유치 및 기술 사업화',
            en: 'Attracting global AI-robotics talent and commercializing technology',
          },
        },
        {
          period: { ko: '2024.05 – 2029.12', en: '2024.05 – 2029.12' },
          title: { ko: 'SW중심대학 사업 (2단계)', en: 'SW-Centered University Program (Phase 2)' },
          note: {
            ko: 'PBL 기반 실무형 교육과정 총괄, 산업 현장 맞춤형 인재 양성',
            en: 'Leads PBL-based practical curriculum and industry-ready talent development',
          },
        },
        {
          period: { ko: '—', en: '—' },
          title: { ko: '현대 모빌리티 SW 채용연계 트랙', en: 'Hyundai Mobility SW Hiring Track' },
          note: {
            ko: '산업체 맞춤형 인재 양성 프로그램 운영',
            en: 'Runs an industry-tailored talent program',
          },
        },
      ],
    },
  },
  {
    id: 'hyunjong-ji',
    slug: 'hyunjong-ji',
    role: 'undergraduate',
    order: 10,
    status: 'published',
    name: { ko: '지현종', en: 'Hyunjong Ji' },
    position: { ko: '학부연구생', en: 'Undergraduate Researcher' },
    education: {
      ko: '서강대학교 컴퓨터공학과 학사과정',
      en: 'B.S. student, Computer Science and Engineering, Sogang University',
    },
    // null이면 아이콘만 보이고 아직 연결되지 않습니다. 예: github: 'https://github.com/아이디'
    contactSlots: { github: null, email: null },
  },
];
