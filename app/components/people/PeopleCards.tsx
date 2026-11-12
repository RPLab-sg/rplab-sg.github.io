import type { Member } from '@/content/types';
import { EmailWithCopy } from '@/components/ui/EmailCopy';
import { Icon } from '@/components/ui/Icon';
import { Media } from '@/components/ui/Media';
import { SlotLink } from '@/components/ui/SlotLink';
import { pick, type Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import styles from './PeopleCards.module.css';

export function ContactList({ member, locale }: { member: Member; locale: Locale }) {
  const items = [
    member.email && { label: ui('email', locale), value: member.email, email: true },
    member.phone && {
      label: ui('phone', locale),
      value: member.phone,
      href: `tel:${member.phone}`,
    },
    member.office && { label: ui('office', locale), value: pick(member.office, locale) },
  ].filter(Boolean) as { label: string; value: string; href?: string; email?: boolean }[];
  return (
    <dl className={styles.contacts}>
      {items.map((c) => (
        <div key={c.label}>
          <dt>{c.label}</dt>
          <dd>
            {c.email ? (
              <EmailWithCopy email={c.value} locale={locale} />
            ) : c.href ? (
              <a href={c.href}>{c.value}</a>
            ) : (
              c.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function MemberLinks({
  member,
  locale,
  hide = [],
}: {
  member: Member;
  locale: Locale;
  hide?: string[];
}) {
  const links = (member.links ?? []).filter((l) => !hide.includes(l.kind));
  if (links.length === 0) return null;
  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li key={link.kind}>
          <SlotLink href={link.href} external={link.external}>
            {pick(link.label, locale)}
          </SlotLink>
        </li>
      ))}
    </ul>
  );
}

export function ProfessorCard({ member, locale }: { member: Member; locale: Locale }) {
  return (
    <article className={styles.professor}>
      <Media
        image={member.photo}
        locale={locale}
        className={styles.portrait}
        width={176}
        height={220}
        eager
      />
      <div className={styles.info}>
        <h3 className={styles.name}>
          {pick(member.name, locale)}
          {locale === 'ko' && (
            <span className={styles.nameEn} lang="en">
              {member.name.en}
            </span>
          )}
        </h3>
        <p className={styles.position}>{pick(member.position, locale)}</p>
        <span className={styles.rule} aria-hidden="true" />
        {member.summary && <p className={styles.summary}>{pick(member.summary, locale)}</p>}
        {member.keywords && (
          <p className={styles.keywords}>{pick(member.keywords, locale).join('   ·   ')}</p>
        )}
        <ContactList member={member} locale={locale} />
        <MemberLinks member={member} locale={locale} />
      </div>
    </article>
  );
}

function undergradLine(member: Member, locale: Locale): string | null {
  const school = member.school && pick(member.school, locale);
  const department = member.education && pick(member.education, locale);
  if (!school && !department) return null;
  return locale === 'ko'
    ? [school, department, '학사과정'].filter(Boolean).join(' ')
    : ['B.S. Student', department, school].filter(Boolean).join(', ');
}

export function StudentCard({ member, locale }: { member: Member; locale: Locale }) {
  const name = pick(member.name, locale);
  const github = member.contactSlots?.github || null;
  const email = member.contactSlots?.email || null;
  return (
    <article className={styles.student}>
      <span className={styles.avatarFrame}>
        {member.photo ? (
          <img
            className={styles.avatar}
            src={member.photo.src}
            alt={pick(member.photo.alt, locale)}
            width={120}
            height={120}
          />
        ) : (
          <span className={`${styles.avatar} ${styles.avatarIcon}`} aria-hidden="true">
            <Icon name="person" size={56} />
          </span>
        )}
        <svg className={styles.ring} viewBox="0 0 130 130" aria-hidden="true">
          <circle className={styles.ringBand} cx="65" cy="65" r="62" pathLength={1} />
          <circle className={styles.ringLine} cx="65" cy="65" r="64.5" pathLength={1} />
        </svg>
      </span>
      <h3 className={styles.studentName}>{name}</h3>
      <p className={styles.course}>{pick(member.position, locale)}</p>
      {member.role === 'undergraduate'
        ? undergradLine(member, locale) && (
            <p className={styles.course}>{undergradLine(member, locale)}</p>
          )
        : member.joined && (
            <p className={styles.course}>
              {ui('joinedYear', locale).replace('{year}', String(member.joined))}
            </p>
          )}
      <div className={styles.actions}>
        {github && (
          <SlotLink href={github} external ariaLabel={`${name} ${ui('githubLabel', locale)}`}>
            <Icon name="github" size={22} />
          </SlotLink>
        )}
        {email && (
          <SlotLink href={`mailto:${email}`} ariaLabel={`${name} ${ui('emailLabel', locale)}`}>
            <Icon name="mail" size={22} />
          </SlotLink>
        )}
      </div>
    </article>
  );
}
