import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { SubPage } from '@/components/layout/SubPage';
import { ChipList } from '@/components/ui/Chip';
import { Media } from '@/components/ui/Media';
import { pick } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { getResearchAxes } from '@/lib/content';
import { scrollToSection } from '@/lib/smoothScroll';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';
import styles from './research.module.css';

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, { axes: await getResearchAxes() });
}

export const meta = staticMeta('Research');

function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0]!.target.id);
      },
      // Active once a section crosses the upper third of the viewport.
      { rootMargin: '-30% 0px -60% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function ResearchPage() {
  const { locale, axes } = useLoaderData<typeof loader>();
  const ids = axes.map((a) => a.id);
  const active = useActiveSection(ids);

  return (
    <SubPage title="Research">
      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label={ui('researchAxes', locale)}>
          <div className={styles.sidebarInner}>
            <p className={styles.sidebarLabel}>{ui('researchAxes', locale)}</p>
            <ol className={styles.sidebarList}>
              {axes.map((axis) => (
                <li key={axis.id}>
                  <a
                    href={`#${axis.id}`}
                    onClick={(e) => scrollToSection(e, axis.id)}
                    aria-current={active === axis.id ? 'true' : undefined}
                    className={active === axis.id ? styles.sidebarActive : undefined}
                  >
                    <span className={styles.sidebarIndex}>
                      {String(axis.order).padStart(2, '0')}
                    </span>
                    <span lang="en">{axis.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className={styles.axes}>
          {axes.map((axis) => (
            <section
              key={axis.id}
              id={axis.id}
              className={styles.axis}
              aria-labelledby={`${axis.id}-heading`}
            >
              <p className={styles.overline}>
                {ui('researchAxis', locale)} {axis.order}
              </p>
              <h2 id={`${axis.id}-heading`} className={styles.title} lang="en">
                {axis.title}
              </h2>
              <ChipList items={pick(axis.keywords, locale)} size="sm" />
              <Media image={axis.image} locale={locale} className={styles.photo} />
              <div className={styles.body}>
                {pick(axis.body, locale).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SubPage>
  );
}
