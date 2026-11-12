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

export function StudentCard({ member, locale }: { member: Member; locale: Locale }) {
  const name = pick(member.name, locale);
  // Students always show both icons; an empty address shows the icon without a link.
  const slots = member.contactSlots ?? { github: null, email: null };
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
      {member.education && <p className={styles.course}>{pick(member.education, locale)}</p>}
      <div className={styles.actions}>
        <SlotLink href={slots.github} external ariaLabel={`${name} ${ui('githubLabel', locale)}`}>
          <Icon name="github" size={22} />
        </SlotLink>
        <SlotLink
          href={slots.email ? `mailto:${slots.email}` : null}
          ariaLabel={`${name} ${ui('emailLabel', locale)}`}
        >
          <Icon name="mail" size={22} />
        </SlotLink>
      </div>
    </article>
  );
}
