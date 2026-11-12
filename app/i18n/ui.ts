import type { Locale } from './locale';

const strings = {
  skipLink: { ko: '본문 바로가기', en: 'Skip to content' },
  mainMenu: { ko: '주 메뉴', en: 'Main menu' },
  homeLabel: { ko: 'RPLab 홈', en: 'RPLab home' },
  languageSwitch: { ko: '언어 선택', en: 'Language' },
  partners: { ko: 'Research & Industry Partners', en: 'Research & Industry Partners' },
  researchAreas: { ko: 'Research Areas', en: 'Research Areas' },
  featuredProjects: { ko: 'Featured Projects', en: 'Featured Projects' },
  previousSlide: { ko: '이전 프로젝트', en: 'Previous project' },
  nextSlide: { ko: '다음 프로젝트', en: 'Next project' },
  latestNews: { ko: 'Latest News & Research', en: 'Latest News & Research' },
  awardsCaption: { ko: '공모전·경진대회 대상', en: 'Grand Prizes in competitions' },
  viewAllNews: { ko: '전체 소식 보기 →', en: 'View all news →' },
  viewAllOutputs: { ko: '전체 성과 보기 →', en: 'View all outputs →' },
  researchDetail: { ko: '연구 자세히 보기 →', en: 'See in detail →' },
  joinTitle: { ko: 'Join RPLab', en: 'Join RPLab' },
  joinBody: {
    ko: '로봇, 센서, 융합 설계에 관심 있는\n대학원생과 학부 연구생을 기다립니다.',
    en: 'We welcome graduate and undergraduate researchers\ninterested in robots, sensors and integrated design.',
  },
  getInTouch: { ko: '문의하기', en: 'Get in Touch' },
  copyEmail: { ko: '이메일 주소 복사', en: 'Copy email address' },
  copied: { ko: '복사됨', en: 'Copied' },
  professor: { ko: 'Professor', en: 'Professor' },
  students: { ko: 'Students', en: 'Students' },
  email: { ko: 'Email', en: 'Email' },
  phone: { ko: 'Phone', en: 'Phone' },
  office: { ko: 'Office', en: 'Office' },
  researchAxis: { ko: 'Research Axis', en: 'Research Axis' },
  researchAxes: { ko: 'Research Axes', en: 'Research Axes' },
  featured: { ko: 'Featured', en: 'Featured' },
  allOutputs: { ko: 'All Outputs', en: 'All Outputs' },
  featuredList: { ko: '대표 성과 목록 (스크롤)', en: 'Featured outputs (scrollable)' },
  projectList: {
    ko: '대표 프로젝트 목록 (가로 스크롤)',
    en: 'Featured projects (scrolls sideways)',
  },
  pagination: { ko: '페이지 이동', en: 'Pagination' },
  page: { ko: '페이지', en: 'Page' },
  previousPage: { ko: '이전 페이지', en: 'Previous page' },
  nextPage: { ko: '다음 페이지', en: 'Next page' },
  readMore: { ko: '자세히 보기 →', en: 'Read more →' },
  filterAll: { ko: '전체', en: 'All' },
  noOutputs: { ko: '아직 등록된 항목이 없습니다.', en: 'Nothing listed here yet.' },
  noNews: { ko: '아직 등록된 소식이 없습니다.', en: 'No news yet.' },
  backToPeople: { ko: '← 구성원', en: '← People' },
  inquiries: { ko: 'Inquiries', en: 'Inquiries' },
  emailLabel: { ko: '이메일', en: 'Email' },
  phoneLabel: { ko: '전화', en: 'Phone' },
  addressLabel: { ko: '주소', en: 'Address' },
  sendEmail: { ko: '이메일 보내기', en: 'Send Email' },
  mapTitle: {
    ko: '서강대학교 김대건관 위치 지도',
    en: 'Map of Kim Dae-gun Hall, Sogang University',
  },
  notFoundTitle: { ko: '페이지를 찾을 수 없습니다.', en: 'Page not found.' },
  errorTitle: { ko: '페이지를 불러오지 못했습니다.', en: 'Something went wrong.' },
  errorBody: {
    ko: '주소를 확인하거나 홈으로 이동해 주세요.',
    en: 'Check the address or go back to the home page.',
  },
  goHome: { ko: '홈으로 이동', en: 'Go to home' },
  githubLabel: { ko: 'GitHub', en: 'GitHub' },
} as const;

export type UiKey = keyof typeof strings;

export function ui(key: UiKey, locale: Locale): string {
  return strings[key][locale];
}
