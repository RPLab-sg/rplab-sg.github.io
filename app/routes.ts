import { index, route, type RouteConfig } from '@react-router/dev/routes';

const pages = [
  { id: 'home', path: '', file: 'routes/home.tsx' },
  { id: 'research', path: 'research', file: 'routes/research.tsx' },
  { id: 'outputs', path: 'outputs', file: 'routes/outputs.tsx' },
  { id: 'people', path: 'people', file: 'routes/people.tsx' },
  { id: 'people-detail', path: 'people/:slug', file: 'routes/people-detail.tsx' },
  { id: 'news', path: 'news', file: 'routes/news.tsx' },
  { id: 'contact', path: 'contact', file: 'routes/contact.tsx' },
];

export default [
  ...pages.map((p) =>
    p.path === ''
      ? index(p.file, { id: `${p.id}-ko` })
      : route(p.path, p.file, { id: `${p.id}-ko` }),
  ),
  ...pages.map((p) => route(p.path === '' ? 'en' : `en/${p.path}`, p.file, { id: `${p.id}-en` })),
] satisfies RouteConfig;
