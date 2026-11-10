import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import { PageLayout } from '@/components/layout/PageLayout';
import { Splash } from '@/components/layout/Splash';
import { SubPage } from '@/components/layout/SubPage';
import { getLocaleFromPath, localizePath } from '@/i18n/locale';
import { useLocale } from '@/i18n/useLocale';
import { ui } from '@/i18n/ui';
import '@/styles/global.css';
import '@/styles/splash.css';

export function links() {
  return [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&family=Manrope:wght@600&family=Noto+Sans+KR:wght@300;400;500&family=Google+Sans+Flex:wght@100..900&display=swap',
    },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  const locale = getLocaleFromPath(useLocation().pathname);
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Splash />
        <a className="skip-link" href="#main-content">
          {ui('skipLink', locale)}
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const locale = useLocale();
  return (
    <PageLayout locale={locale}>
      <Outlet />
    </PageLayout>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const locale = useLocale();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <PageLayout locale={locale}>
      <SubPage title={notFound ? '404' : 'Error'}>
        <section className="stack">
          <h2>{ui(notFound ? 'notFoundTitle' : 'errorTitle', locale)}</h2>
          <p>{ui('errorBody', locale)}</p>
          <p>
            <a href={localizePath('/', locale)}>{ui('goHome', locale)}</a>
          </p>
        </section>
      </SubPage>
    </PageLayout>
  );
}
