import { useLoaderData } from 'react-router';
import { SubPage, SubSection } from '@/components/layout/SubPage';
import { EmailWithCopy } from '@/components/ui/EmailCopy';
import { Icon, type IconName } from '@/components/ui/Icon';
import { PillButton } from '@/components/ui/PillButton';
import { mapEmbedUrl, site } from '@/config/site';
import { pick, type Localized } from '@/i18n/locale';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';
import { ui } from '@/i18n/ui';
import styles from './contact.module.css';

const inquiries: { title: Localized; subtitle: string; body: Localized }[] = [
  {
    title: { ko: '연구실 참여', en: 'Join the Lab' },
    subtitle: 'Join the lab',
    body: {
      ko: '로봇, 센서, 융합 설계에 관심 있는 대학원생과 학부 연구생을 기다립니다.\n 간단한 자기소개와 관심 연구 분야를 이메일로 보내 주세요.',
      en: 'We welcome graduate students and undergraduate researchers interested in robotics, sensors and integrated design. Send us a short introduction and your research interests by email.',
    },
  },
  {
    title: { ko: '산학 협력', en: 'Industry Collaboration' },
    subtitle: 'Industry collaboration',
    body: {
      ko: '공동 연구, 기술이전, 교육용 소프트웨어 도입 등 산업체·기관과의 협력을 환영합니다.',
      en: 'We welcome collaboration with companies and institutions, including joint research, technology transfer and adoption of educational software.',
    },
  },
];

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, {});
}

export const meta = staticMeta('Contact');

export default function ContactPage() {
  const { locale } = useLoaderData<typeof loader>();
  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    {
      icon: 'mail',
      label: ui('emailLabel', locale),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    { icon: 'call', label: ui('phoneLabel', locale), value: site.phone, href: `tel:${site.phone}` },
    { icon: 'place', label: ui('addressLabel', locale), value: pick(site.address, locale) },
  ];

  return (
    <SubPage title="Contact">
      <SubSection
        id="inquiries-heading"
        title={ui('inquiries', locale)}
        className={styles.inquiries}
      >
        <ul className={styles.columns}>
          {inquiries.map((q) => (
            <li key={q.subtitle} className={styles.column}>
              <h3 className={styles.columnTitle}>{pick(q.title, locale)}</h3>
              {locale === 'ko' && (
                <p className={styles.columnSub} lang="en">
                  {q.subtitle}
                </p>
              )}
              <p className={styles.columnBody}>{pick(q.body, locale)}</p>
            </li>
          ))}
        </ul>
        <div>
          <PillButton to={`mailto:${site.email}`}>{ui('sendEmail', locale)}</PillButton>
        </div>
      </SubSection>

      <section className={styles.details}>
        <ul className={styles.list}>
          {details.map((d) => (
            <li key={d.icon} className={styles.item}>
              <Icon name={d.icon} className={styles.icon} />
              <span className={styles.itemText}>
                <span className={styles.label}>{d.label}</span>
                {d.icon === 'mail' ? (
                  <EmailWithCopy
                    email={d.value}
                    locale={locale}
                    className={styles.value}
                    iconSize={20}
                  />
                ) : d.href ? (
                  <a className={styles.value} href={d.href}>
                    {d.value}
                  </a>
                ) : (
                  <span className={styles.value}>{d.value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <iframe
          className={styles.map}
          title={ui('mapTitle', locale)}
          src={mapEmbedUrl(locale)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </SubPage>
  );
}
