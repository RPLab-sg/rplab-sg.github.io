import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { SubPage, SubSection } from '@/components/layout/SubPage';
import { Media } from '@/components/ui/Media';
import tabs from '@/components/ui/Tabs.module.css';
import type { OutputType } from '@/content/types';
import { pick } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { getOutputs } from '@/lib/content';
import { outputFilterOrder, outputTypeLabels } from '@/lib/labels';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';
import styles from './outputs.module.css';

const TITLE = 'Research Outputs';

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, { outputs: await getOutputs() });
}

export const meta = staticMeta(TITLE);

export default function OutputsPage() {
  const { locale, outputs } = useLoaderData<typeof loader>();
  const [filter, setFilter] = useState<OutputType | 'all'>('all');
  const featured = outputs.filter((o) => o.featured);
  const visible = filter === 'all' ? outputs : outputs.filter((o) => o.type === filter);

  return (
    <SubPage title={TITLE}>
      {featured.length > 0 && (
        <SubSection id="featured-heading" title={ui('featured', locale)}>
          {featured.map((o) => (
            <article key={o.id} className={styles.feature}>
              {o.image && (
                <Media
                  image={o.image}
                  locale={locale}
                  className={styles.featureImage}
                  width={1472}
                  height={920}
                  eager
                />
              )}
              <div className={styles.featureText}>
                <p className={styles.tag}>{pick(o.tag, locale)}</p>
                <h3 className={styles.featureTitle}>{pick(o.title, locale)}</h3>
                <p className={styles.featureDescription}>{pick(o.description, locale)}</p>
                {o.href && (
                  <a className={styles.more} href={o.href}>
                    {ui('readMore', locale)}
                  </a>
                )}
              </div>
            </article>
          ))}
        </SubSection>
      )}

      <SubSection id="all-heading" title={ui('allOutputs', locale)}>
        <div className={styles.filters} role="toolbar" aria-label={ui('allOutputs', locale)}>
          {(['all', ...outputFilterOrder] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              className={filter === key ? `${tabs.tab} ${tabs.active}` : tabs.tab}
              onClick={() => setFilter(key)}
            >
              {key === 'all' ? ui('filterAll', locale) : pick(outputTypeLabels[key], locale)}
            </button>
          ))}
        </div>
        {visible.length > 0 ? (
          <ul>
            {visible.map((o) => (
              <li key={o.id} className={styles.row}>
                <span className={styles.year}>{o.year ?? '—'}</span>
                <span className={styles.type}>{pick(outputTypeLabels[o.type], locale)}</span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{pick(o.title, locale)}</span>
                  <span className={styles.rowSub}>{pick(o.subtitle, locale)}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>{ui('noOutputs', locale)}</p>
        )}
      </SubSection>
    </SubPage>
  );
}
