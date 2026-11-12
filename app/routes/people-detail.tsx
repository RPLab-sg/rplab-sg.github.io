import type { ReactNode } from 'react';
import { data, useLoaderData, type MetaFunction } from 'react-router';
import { ContactList, MemberLinks } from '@/components/people/PeopleCards';
import cardStyles from '@/components/people/PeopleCards.module.css';
import { LocalizedLink } from '@/components/ui/LocalizedLink';
import { Media } from '@/components/ui/Media';
import { pageMeta } from '@/config/site';
import type { TimelineEntry } from '@/content/types';
import { pick, type Locale, type Localized } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { getMemberBySlug } from '@/lib/content';
import { withLocale, type LoaderArgs } from '@/lib/route';
import styles from './people-detail.module.css';

export async function loader({ request, params }: LoaderArgs<'slug'>) {
  const member = params.slug ? await getMemberBySlug(params.slug) : undefined;
  if (!member?.detail) throw data(null, { status: 404 });
  return withLocale(request, { member, detail: member.detail });
}

export const meta: MetaFunction<typeof loader> = ({ loaderData: d }) =>
  d ? pageMeta(pick(d.member.name, d.locale), d.locale) : [];

const sectionTitles: Record<'research' | 'experience' | 'education' | 'activities', Localized> = {
  research: { ko: '연구 분야', en: 'Research' },
  experience: { ko: '경력', en: 'Experience' },
  education: { ko: '학력', en: 'Education' },
  activities: { ko: '활동', en: 'Activities' },
};

function Section({
  id,
  locale,
  children,
}: {
  id: keyof typeof sectionTitles;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={`profile-${id}`}>
      <div className={styles.label}>
        <h2 id={`profile-${id}`}>{pick(sectionTitles[id], locale)}</h2>
        {locale === 'ko' && <p lang="en">{sectionTitles[id].en}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}

function Timeline({ items, locale }: { items: TimelineEntry[]; locale: Locale }) {
  return (
    <ul className={styles.timeline}>
      {items.map((e, i) => (
        <li key={i}>
          <span className={styles.when}>{pick(e.period, locale)}</span>
          <span className={styles.what}>
            <span>{pick(e.title, locale)}</span>
            {e.note && <span className={styles.note}>{pick(e.note, locale)}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PeopleDetailPage() {
  const { locale, member, detail } = useLoaderData<typeof loader>();
  return (
    <div className={`container ${styles.page}`}>
      <LocalizedLink to="/people" className={styles.back}>
        {ui('backToPeople', locale)}
      </LocalizedLink>

      <header className={styles.hero}>
        <div>
          <Media
            image={member.photo}
            locale={locale}
            className={cardStyles.portrait}
            width={176}
            height={220}
            eager
          />
        </div>
        <div className={styles.identity}>
          <p className={styles.overline} lang="en">
            Professor
          </p>
          <h1 className={styles.name}>
            {pick(member.name, locale)}
            {locale === 'ko' && (
              <span className={styles.nameEn} lang="en">
                {member.name.en}
              </span>
            )}
          </h1>
          <p className={styles.position}>{pick(member.position, locale)}</p>
          <span className={cardStyles.rule} aria-hidden="true" />
          <p className={styles.summary}>{pick(detail.summary, locale)}</p>
          <ContactList member={member} locale={locale} />
          <MemberLinks member={member} locale={locale} hide={['profile']} />
        </div>
      </header>

      <div className={styles.sections}>
        <Section id="research" locale={locale}>
          <div className={styles.researchList}>
            {detail.research.map((r, i) => (
              <div key={i} className={styles.research}>
                <h3>{pick(r.title, locale)}</h3>
                <p>{pick(r.body, locale)}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section id="experience" locale={locale}>
          <Timeline items={detail.experience} locale={locale} />
        </Section>
        <Section id="education" locale={locale}>
          <Timeline items={detail.education} locale={locale} />
        </Section>
        <Section id="activities" locale={locale}>
          <Timeline items={detail.activities} locale={locale} />
        </Section>
      </div>
    </div>
  );
}
