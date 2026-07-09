import heroWorkspace from '../assets/hero-workspace.png';

export type Language = 'en' | 'ko';
export type ProjectStatus = 'live' | 'prototype' | 'in-progress';

type LocalizedText = Record<Language, string>;

type ProjectCopy = {
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  highlights: string[];
  outcomes: string[];
};

export const defaultLanguage: Language = 'en';

export const languageOptions: { code: Language; shortLabel: string; label: string }[] = [
  { code: 'en', shortLabel: 'EN', label: 'English' },
  { code: 'ko', shortLabel: 'KR', label: '한국어' },
];

export const profile = {
  name: 'Max Yoon',
  email: 'hello@yoon6.dev',
  githubUrl: 'https://github.com/yoon6',
  heroImage: heroWorkspace,
  copy: {
    en: {
      title: 'Software Engineer',
      location: 'Seoul, Korea',
      summary:
        'I build practical web systems with a bias for clear architecture, reliable interfaces, and fast iteration.',
      availability: 'Open to product engineering, platform, and frontend roles.',
    },
    ko: {
      title: '소프트웨어 엔지니어',
      location: '대한민국 서울',
      summary:
        '명확한 구조, 신뢰할 수 있는 인터페이스, 빠른 반복을 중요하게 생각하며 실용적인 웹 시스템을 만듭니다.',
      availability: '제품 엔지니어링, 플랫폼, 프론트엔드 역할에 열려 있습니다.',
    },
  } satisfies Record<Language, {
    title: string;
    location: string;
    summary: string;
    availability: string;
  }>,
};

export const uiCopy = {
  en: {
    document: {
      title: 'Max Yoon | Portfolio',
      description: 'Max Yoon portfolio, resume, and selected software engineering projects.',
    },
    nav: {
      label: 'Primary navigation',
      home: 'Home',
      projects: 'Projects',
      resume: 'Resume',
    },
    actions: {
      viewProjects: 'View projects',
      openProject: 'Open project',
      resume: 'Resume',
      github: 'GitHub',
      email: 'Email',
      location: 'Location',
    },
    aria: {
      home: 'Go to home',
      github: 'Open GitHub profile',
      email: 'Email Max Yoon',
      language: 'Select language',
      externalLinks: 'External links',
      renderedResume: 'Rendered resume',
      resumeLoading: 'Resume is loading',
    },
    home: {
      eyebrow: 'Portfolio',
      selectedEyebrow: 'Selected work',
      selectedTitle: 'Projects shaped around useful interfaces and maintainable systems.',
      selectedDescription:
        'Concise case studies for product surfaces, document workflows, and deployment-ready systems.',
      focusEyebrow: 'Focus',
      focusTitle: 'Engineering focus',
      focusDescription:
        'The work leans toward practical interfaces, precise documents, and systems that are easy to evolve.',
      timelineEyebrow: 'Trajectory',
      timelineTitle: 'From blog archive to portfolio surface.',
    },
    projectsPage: {
      eyebrow: 'Projects',
      title: 'Project introductions',
      description:
        'Selected work across portfolio tooling, resume rendering, and product case study structure.',
    },
    projectDetail: {
      notFoundTitle: 'Project not found',
      notFoundDescription: 'The project route does not match an item in the portfolio data.',
      backToProjects: 'Projects',
      facts: {
        year: 'Year',
        role: 'Role',
        stack: 'Stack',
      },
      overview: 'Overview',
      highlights: 'Highlights',
      outcomes: 'Outcomes',
      links: 'Links',
    },
    resumePage: {
      eyebrow: 'Resume',
      title: 'Rendered resume',
      description: 'A clean resume page rendered from Typst behind the scenes.',
      loading: 'Rendering resume',
      errorTitle: 'Typst renderer unavailable',
      fallbackError: 'The Typst document could not be rendered.',
    },
  },
  ko: {
    document: {
      title: 'Max Yoon | 포트폴리오',
      description: 'Max Yoon의 포트폴리오, 이력서, 주요 소프트웨어 엔지니어링 프로젝트.',
    },
    nav: {
      label: '주요 내비게이션',
      home: '홈',
      projects: '프로젝트',
      resume: '이력서',
    },
    actions: {
      viewProjects: '프로젝트 보기',
      openProject: '프로젝트 열기',
      resume: '이력서',
      github: 'GitHub',
      email: '이메일',
      location: '위치',
    },
    aria: {
      home: '홈으로 이동',
      github: 'GitHub 프로필 열기',
      email: 'Max Yoon에게 이메일 보내기',
      language: '언어 선택',
      externalLinks: '외부 링크',
      renderedResume: '렌더링된 이력서',
      resumeLoading: '이력서를 불러오는 중',
    },
    home: {
      eyebrow: '포트폴리오',
      selectedEyebrow: '주요 작업',
      selectedTitle: '실용적인 인터페이스와 유지보수 가능한 시스템을 중심으로 한 프로젝트.',
      selectedDescription:
        '제품 화면, 문서 워크플로, 배포 가능한 시스템을 간결한 사례로 정리했습니다.',
      focusEyebrow: '초점',
      focusTitle: '엔지니어링 관심 영역',
      focusDescription:
        '실무에 바로 쓰이는 인터페이스, 정교한 문서, 오래 발전시킬 수 있는 시스템에 집중합니다.',
      timelineEyebrow: '흐름',
      timelineTitle: '블로그 아카이브에서 포트폴리오로.',
    },
    projectsPage: {
      eyebrow: '프로젝트',
      title: '프로젝트 소개',
      description:
        '포트폴리오 도구, 이력서 렌더링, 제품 사례 구조를 중심으로 선택한 작업입니다.',
    },
    projectDetail: {
      notFoundTitle: '프로젝트를 찾을 수 없습니다',
      notFoundDescription: '현재 경로와 일치하는 프로젝트 데이터가 없습니다.',
      backToProjects: '프로젝트',
      facts: {
        year: '연도',
        role: '역할',
        stack: '스택',
      },
      overview: '개요',
      highlights: '핵심 작업',
      outcomes: '결과',
      links: '링크',
    },
    resumePage: {
      eyebrow: '이력서',
      title: '렌더링된 이력서',
      description: 'Typst로 작성한 이력서를 화면에 바로 렌더링합니다.',
      loading: '이력서를 렌더링하는 중',
      errorTitle: 'Typst 렌더러를 사용할 수 없습니다',
      fallbackError: 'Typst 문서를 렌더링하지 못했습니다.',
    },
  },
} satisfies Record<Language, {
  document: {
    title: string;
    description: string;
  };
  nav: {
    label: string;
    home: string;
    projects: string;
    resume: string;
  };
  actions: {
    viewProjects: string;
    openProject: string;
    resume: string;
    github: string;
    email: string;
    location: string;
  };
  aria: {
    home: string;
    github: string;
    email: string;
    language: string;
    externalLinks: string;
    renderedResume: string;
    resumeLoading: string;
  };
  home: Record<string, string>;
  projectsPage: Record<string, string>;
  projectDetail: {
    notFoundTitle: string;
    notFoundDescription: string;
    backToProjects: string;
    facts: {
      year: string;
      role: string;
      stack: string;
    };
    overview: string;
    highlights: string;
    outcomes: string;
    links: string;
  };
  resumePage: Record<string, string>;
}>;

export const statusLabels: Record<Language, Record<ProjectStatus, string>> = {
  en: {
    live: 'Live',
    prototype: 'Prototype',
    'in-progress': 'In progress',
  },
  ko: {
    live: '운영 중',
    prototype: '프로토타입',
    'in-progress': '진행 중',
  },
};

export const focusAreas = {
  en: [
    {
      title: 'Product interfaces',
      description:
        'React applications, design systems, dashboards, and workflows that are efficient to use every day.',
      accent: 'teal',
    },
    {
      title: 'Document tooling',
      description:
        'Resume and publishing flows with Typst, markdown, static rendering, and browser-side previews.',
      accent: 'red',
    },
    {
      title: 'Backend foundations',
      description:
        'APIs, data models, build pipelines, and deployment paths that keep projects maintainable.',
      accent: 'gold',
    },
  ],
  ko: [
    {
      title: '제품 인터페이스',
      description:
        '매일 반복해서 쓰기 편한 React 애플리케이션, 디자인 시스템, 대시보드, 작업 흐름을 만듭니다.',
      accent: 'teal',
    },
    {
      title: '문서 도구',
      description:
        'Typst, Markdown, 정적 렌더링, 브라우저 미리보기로 이력서와 퍼블리싱 흐름을 다룹니다.',
      accent: 'red',
    },
    {
      title: '백엔드 기반',
      description:
        '유지보수하기 쉬운 API, 데이터 모델, 빌드 파이프라인, 배포 경로를 설계합니다.',
      accent: 'gold',
    },
  ],
} satisfies Record<Language, {
  title: string;
  description: string;
  accent: 'teal' | 'red' | 'gold';
}[]>;

export type Project = {
  slug: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  copy: Record<Language, ProjectCopy>;
  links: {
    label: LocalizedText;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: 'typst-resume-renderer',
    year: '2026',
    status: 'live',
    stack: ['React', 'TypeScript', 'Typst.ts', 'Vite'],
    copy: {
      en: {
        title: 'Typst Resume Renderer',
        subtitle: 'Resume page with browser-side Typst output.',
        summary: 'A portfolio resume page that renders a Typst document directly in the browser.',
        role: 'Design and engineering',
        highlights: [
          'Loads the Typst runtime only when the resume page needs it.',
          'Keeps the document source in the codebase while showing visitors only the rendered page.',
          'Renders SVG output directly in the page for crisp browser display.',
        ],
        outcomes: [
          'Single source of truth for resume content.',
          'No server process required for GitHub Pages deployment.',
          'Simple path to replace the default source with a custom resume.',
        ],
      },
      ko: {
        title: 'Typst 이력서 렌더러',
        subtitle: '브라우저에서 Typst 결과를 보여주는 이력서 페이지.',
        summary: 'Typst 문서를 브라우저에서 바로 렌더링하는 포트폴리오 이력서 페이지입니다.',
        role: '설계 및 구현',
        highlights: [
          '이력서 페이지가 필요할 때만 Typst 런타임을 불러옵니다.',
          '문서 원본은 코드베이스에 두고 방문자에게는 렌더링된 결과만 보여줍니다.',
          'SVG 결과를 페이지에 직접 표시해 선명한 문서 화면을 제공합니다.',
        ],
        outcomes: [
          '이력서 내용을 하나의 원본으로 관리합니다.',
          'GitHub Pages 배포를 위해 별도 서버가 필요 없습니다.',
          '기본 원본을 실제 이력서로 교체하기 쉽습니다.',
        ],
      },
    },
    links: [{ label: { en: 'Open resume', ko: '이력서 보기' }, href: '#/resume' }],
  },
  {
    slug: 'portfolio-system',
    year: '2026',
    status: 'live',
    stack: ['React', 'TypeScript', 'CSS', 'GitHub Pages'],
    copy: {
      en: {
        title: 'Portfolio System',
        subtitle: 'Data-driven portfolio shell for GitHub Pages.',
        summary:
          'A clean React site structure with landing, project introduction, detail, and resume pages.',
        role: 'Frontend architecture',
        highlights: [
          'Uses hash routes so project detail pages work on static hosting.',
          'Stores page content in typed data files for low-friction updates.',
          'Ships with a GitHub Actions workflow that builds and deploys the Vite output.',
        ],
        outcomes: [
          'Old blog generator removed.',
          'Portfolio content can evolve without touching routing code.',
          'Production build emits static assets into dist.',
        ],
      },
      ko: {
        title: '포트폴리오 시스템',
        subtitle: 'GitHub Pages를 위한 데이터 기반 포트폴리오 셸.',
        summary:
          '랜딩, 프로젝트 소개, 상세 페이지, 이력서, 연락 페이지를 갖춘 React 사이트 구조입니다.',
        role: '프론트엔드 아키텍처',
        highlights: [
          '정적 호스팅에서도 프로젝트 상세 페이지가 동작하도록 해시 라우팅을 사용합니다.',
          '페이지 내용을 타입이 있는 데이터 파일에 분리해 업데이트 부담을 줄였습니다.',
          'Vite 결과물을 빌드하고 배포하는 GitHub Actions 워크플로를 포함합니다.',
        ],
        outcomes: [
          '기존 블로그 생성기를 제거했습니다.',
          '라우팅 코드를 건드리지 않고 포트폴리오 내용을 발전시킬 수 있습니다.',
          '프로덕션 빌드는 정적 자산을 dist로 출력합니다.',
        ],
      },
    },
    links: [{ label: { en: 'View projects', ko: '프로젝트 보기' }, href: '#/projects' }],
  },
  {
    slug: 'music-hub',
    year: '2024',
    status: 'prototype',
    stack: ['TypeScript', 'Web UI', 'API Integration'],
    copy: {
      en: {
        title: 'Music Hub',
        subtitle: 'Project case study slot for an audio or playlist product.',
        summary:
          'A preserved project slot from the previous site structure, ready to be filled with real scope, screenshots, and links.',
        role: 'Project owner',
        highlights: [
          'Organizes project notes as a case study instead of a blog entry.',
          'Has room for product goals, architecture choices, and measurable results.',
          'Can be connected to a live repository or demo URL from the data file.',
        ],
        outcomes: [
          'Reusable detail layout for future portfolio projects.',
          'Clear separation between project summary and deeper technical context.',
          'Editable without changing component code.',
        ],
      },
      ko: {
        title: 'Music Hub',
        subtitle: '오디오 또는 플레이리스트 제품을 위한 프로젝트 사례 영역.',
        summary:
          '이전 사이트 구조에서 가져온 프로젝트 슬롯으로, 실제 범위와 스크린샷, 링크를 채울 수 있습니다.',
        role: '프로젝트 오너',
        highlights: [
          '프로젝트 노트를 블로그 글이 아니라 사례 연구 형태로 정리합니다.',
          '제품 목표, 아키텍처 선택, 측정 가능한 결과를 담을 수 있습니다.',
          '데이터 파일에서 실제 저장소나 데모 URL을 연결할 수 있습니다.',
        ],
        outcomes: [
          '향후 포트폴리오 프로젝트에 재사용할 수 있는 상세 레이아웃입니다.',
          '프로젝트 요약과 더 깊은 기술 맥락을 분리합니다.',
          '컴포넌트 코드를 바꾸지 않고 내용을 편집할 수 있습니다.',
        ],
      },
    },
    links: [{ label: { en: 'Project details', ko: '프로젝트 상세' }, href: '#/projects/music-hub' }],
  },
];

export const timeline = {
  en: [
    {
      period: 'Now',
      title: 'Portfolio and resume system',
      description: 'Rebuilding this site into a focused portfolio with live Typst resume rendering.',
    },
    {
      period: 'Recent',
      title: 'Web application work',
      description: 'Designing typed UI surfaces, reusable components, and deployment-ready static apps.',
    },
    {
      period: 'Earlier',
      title: 'Technical writing and systems study',
      description: 'Maintained a blog archive while studying JVM, HTTP, sessions, and interface design.',
    },
  ],
  ko: [
    {
      period: '현재',
      title: '포트폴리오와 이력서 시스템',
      description: '이 사이트를 Typst 이력서 렌더링을 포함한 포트폴리오로 재구성하고 있습니다.',
    },
    {
      period: '최근',
      title: '웹 애플리케이션 작업',
      description: '타입이 있는 UI, 재사용 가능한 컴포넌트, 배포 가능한 정적 앱을 설계했습니다.',
    },
    {
      period: '이전',
      title: '기술 글쓰기와 시스템 학습',
      description: 'JVM, HTTP, 세션, 인터페이스 설계를 학습하며 블로그 아카이브를 운영했습니다.',
    },
  ],
} satisfies Record<Language, {
  period: string;
  title: string;
  description: string;
}[]>;
