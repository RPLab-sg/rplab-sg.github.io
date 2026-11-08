import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { NewsItem, Output, ResearchAxis } from '@/content/types';
import { Icon, type IconName } from '@/components/ui/Icon';
import { LocalizedLink } from '@/components/ui/LocalizedLink';
import { Media } from '@/components/ui/Media';
import { PillButton } from '@/components/ui/PillButton';
import { site } from '@/config/site';
import { pick, type Locale } from '@/i18n/locale';
import { newsCategoryLabels } from '@/lib/labels';
import { ui } from '@/i18n/ui';
import { HomeSection } from './HomeSection';
import styles from './HomeBlocks.module.css';

const axisIcons: Record<string, IconName> = {
  robotics: 'precisionManufacturing',
  sensors: 'sensors',
  'integrated-design': 'designServices',
};

export function ResearchAreas({ axes, locale }: { axes: ResearchAxis[]; locale: Locale }) {
  return (
    <HomeSection
      id="research-areas"
      title={ui('researchAreas', locale)}
      className={styles.research}
    >
      <ul className={styles.axes}>
        {axes.map((axis) => (
          <li key={axis.id} className={styles.axis}>
            <div className={styles.axisInner}>
              {axisIcons[axis.id] && (
                <span className={styles.axisIcon}>
                  <Icon name={axisIcons[axis.id]!} size={24} />
                </span>
              )}
              <h3 className={styles.axisTitle} lang="en">
                {axis.title}
              </h3>
              <p className={styles.axisSummary}>{pick(axis.summary, locale)}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.moreLink}>
        <LocalizedLink to="/research">{ui('researchDetail', locale)}</LocalizedLink>
      </p>
    </HomeSection>
  );
}

export function FeaturedProjects({ outputs, locale }: { outputs: Output[]; locale: Locale }) {
  return (
    <HomeSection id="featured-projects" title={ui('featuredProjects', locale)}>
      <ul className={styles.projects}>
        {outputs.map((o) => (
          <li key={o.id} className={styles.project}>
            {o.image && (
              <Media
                image={o.image}
                locale={locale}
                className={styles.projectImage}
                width={1248}
                height={780}
              />
            )}
            <p className={styles.tag}>{pick(o.shortTag, locale)}</p>
            <h3 className={styles.projectTitle}>
              <LocalizedLink to="/outputs">{pick(o.title, locale)}</LocalizedLink>
            </h3>
            <p className={styles.projectDescription}>{pick(o.description, locale)}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

export interface NewsStats {
  awards: number;
  from: string;
  to: string;
}

function NewsMetaLine({ item, locale }: { item: NewsItem; locale: Locale }) {
  return (
    <span className={styles.tileMeta}>
      <span className={styles.tileCat}>{pick(newsCategoryLabels[item.category], locale)}</span>
      <span aria-hidden="true">·</span>
      <span>{item.publishedAt}</span>
    </span>
  );
}

export function LatestNews({
  items,
  stats,
  locale,
}: {
  items: NewsItem[];
  stats: NewsStats;
  locale: Locale;
}) {
  const [lead, second, third] = items;
  return (
    <HomeSection id="latest-news" title={ui('latestNews', locale)}>
      <div className={styles.bento}>
        {lead && (
          <article className={`${styles.tile} ${styles.tileLead}`}>
            <Media image={lead.cover} locale={locale} className={styles.leadPhoto} decorative />
            <span className={styles.tileText}>
              <NewsMetaLine item={lead} locale={locale} />
              <span className={styles.leadTitle}>{pick(lead.title, locale)}</span>
              {lead.detail && (
                <span className={styles.tileDetail}>{pick(lead.detail, locale)}</span>
              )}
            </span>
          </article>
        )}
        {second && (
          <article className={`${styles.tile} ${styles.tileTint}`}>
            <span className={styles.tileText}>
              <NewsMetaLine item={second} locale={locale} />
              <span className={styles.tileTitle}>{pick(second.title, locale)}</span>
            </span>
          </article>
        )}
        {stats.awards > 0 && (
          <div className={`${styles.tile} ${styles.tileStat}`}>
            <span className={styles.statNumber}>{stats.awards}</span>
            <span className={styles.statCaption}>
              {stats.from === stats.to ? stats.from : `${stats.from}–${stats.to}`}
              <br />
              {ui('awardsCaption', locale)}
            </span>
          </div>
        )}
        {third ? (
          <article className={`${styles.tile} ${styles.tileRow}`}>
            <Media image={third.cover} locale={locale} className={styles.rowPhoto} decorative />
            <span className={styles.tileText}>
              <NewsMetaLine item={third} locale={locale} />
              <span className={styles.tileTitle}>{pick(third.title, locale)}</span>
            </span>
          </article>
        ) : (
          <div
            className={`${styles.tile} ${styles.tileRow} ${styles.tileEmpty}`}
            aria-hidden="true"
          >
            <span className={styles.rowPhoto} />
          </div>
        )}
      </div>
      <p className={styles.allNews}>
        <LocalizedLink to="/news">{ui('viewAllNews', locale)}</LocalizedLink>
      </p>
    </HomeSection>
  );
}

function EmailCopy({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Clipboard blocked (insecure context or denied): fall back to the mail client.
      window.location.href = `mailto:${site.email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };
  return (
    <span className={styles.emailCopyWrap}>
      <button
        type="button"
        className={styles.emailCopy}
        onClick={copy}
        aria-label={`${site.email} — ${ui('copyEmail', locale)}`}
      >
        <span>{site.email}</span>
        <Icon name={copied ? 'check' : 'contentCopy'} size={18} />
      </button>
      <span className={styles.copiedNote} data-visible={copied} role="status">
        {copied ? ui('copied', locale) : ''}
      </span>
    </span>
  );
}

function RadarRings() {
  const radii = [90, 170, 250, 330, 410];
  return (
    <svg className={styles.radar} viewBox="0 0 820 820" aria-hidden="true" focusable="false">
      {radii.map((r, i) => (
        <circle
          key={r}
          cx="410"
          cy="410"
          r={r - 0.5}
          style={{ '--ring-opacity': 0.22 - i * 0.035, '--ring-index': i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

export function JoinBand({ locale }: { locale: Locale }) {
  return (
    <section id="join" className={`container ${styles.joinWrap}`} aria-labelledby="join-heading">
      <div className={styles.join}>
        <RadarRings />
        <h2 id="join-heading" className={styles.joinTitle} lang="en">
          {ui('joinTitle', locale)}
        </h2>
        <p className={styles.joinBody}>{ui('joinBody', locale)}</p>
        <div className={styles.joinActions}>
          <PillButton to={`mailto:${site.email}`}>{ui('getInTouch', locale)}</PillButton>
          <EmailCopy locale={locale} />
        </div>
        <p className={styles.joinAddress}>{pick(site.addressOneLine, locale)}</p>
      </div>
    </section>
  );
}
