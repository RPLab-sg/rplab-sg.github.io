# RPLab Web

서강대학교 컴퓨터공학과 RPLab(Robot Platform Laboratory) 웹사이트입니다. React, React Router Framework Mode, Vite, TypeScript와 Node.js를 사용합니다.

## 시작

```sh
nvm install
nvm use
npm ci
npm run dev
```

현재 Node.js 26.13.0과 npm 11을 기준으로 설정했습니다. 

## 명령

| 명령                   | 용도                                |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | 개발 서버                           |
| `npm run typecheck`    | 라우트 타입 생성 및 TypeScript 검사 |
| `npm run lint`         | ESLint 검사                         |
| `npm run format`       | Prettier 자동 정리                  |
| `npm run format:check` | 포맷 검사                           |
| `npm run check`        | 타입·린트·포맷 전체 검사            |
| `npm run build`        | 정적 HTML과 배포 파일 생성          |
| `npm run preview`      | 프로덕션 빌드 로컬 확인             |

## 페이지와 언어

한국어는 루트, 영어는 `/en` 아래에 같은 페이지를 제공합니다. 헤더의 `KR / ENG`는 같은 페이지의 다른 언어로 이동합니다.

| 메뉴 (KR / EN)          | 경로        |
| ----------------------- | ----------- |
| 홈 / Home               | `/`, `/en`  |
| 연구 / Research         | `/research` |
| 성과 / Research Outputs | `/outputs`  |
| 구성원 / People         | `/people`   |
| 소식 / News             | `/news`     |
| 문의 / Contact          | `/contact`  |

## 구조

- `app/routes.ts`: 페이지마다 한국어·영어 경로를 함께 등록
- `app/routes/`: 페이지 모듈. 각 페이지는 `loader`에서 데이터를 읽습니다
- `app/content/`: 구성원·소식·성과·연구 축·협력 기관 데이터. `types.ts`는 향후 DB 테이블 구조와 같습니다
- `app/lib/content.ts`: 데이터 접근 함수(`getNews()`, `getMembers()` 등). 지금은 파일을 읽고, 나중에 DB를 읽도록 이 파일만 바꿉니다
- `app/lib/route.ts`: 페이지 공통 도우미(`withLocale()`로 loader에 언어 추가, `staticMeta()`로 메타 정보 생성)
- `app/lib/labels.ts`: 소식 분류·성과 유형 이름
- `app/i18n/`: 언어 판별, 경로 변환, 화면 문구
- `app/config/`: 연구실 정보, 메뉴, 페이지 메타 정보
- `app/components/layout/`: 헤더·푸터·하위 페이지 틀·로딩 화면(`Splash`)
- `app/components/home/`, `app/components/people/`: 페이지 전용 섹션
- `app/components/ui/`: 버튼·칩·아이콘·탭 등 공통 UI. `Media`는 이미지가 없을 때 같은 크기의 빈 칸을, `SlotLink`는 주소가 없을 때 누를 수 없는 링크를 보여줍니다
- `app/styles/tokens.css`: Figma에서 가져온 Material 3 색상·모서리·간격 토큰
- `public/images/`: 히어로·구성원·협력 기관·프로젝트 이미지

`@/`는 `app/`을 가리킵니다. 단, `app/content/`의 파일은 `react-router.config.ts`에서도 직접 읽으므로 상대 경로로만 import 합니다.

## 콘텐츠 추가

1. 해당 파일(`app/content/news.ts` 등)에 항목을 추가합니다. 한국어·영어 칸을 모두 채우고, 영어가 비어 있으면 한국어가 표시됩니다.
2. 이미지는 `public/images/` 아래에 두고 경로를 적습니다.
3. `status: 'published'`인 항목만 화면에 나옵니다.
4. 새 소식의 상세 페이지는 빌드할 때 자동으로 생성됩니다.

## 렌더링과 배포

`react-router.config.ts`에서 `ssr: false`와 사전 렌더링을 사용합니다. 모든 페이지와 소식 상세 페이지를 두 언어로 빌드 시 HTML로 생성하며, 결과는 `build/client/`에 있습니다. 운영용 Node.js 서버는 필요하지 않습니다.


## 의존성

의존성 버전과 `package-lock.json`을 함께 관리하고, CI와 새 환경에서는 `npm ci`를 사용합니다. 

개발 도구의 간접 의존성인 minimatch는 [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) 수정 버전인 11.0.5로 고정했습니다. 
