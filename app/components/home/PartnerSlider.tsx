import type { Partner } from '@/content/types';
import { pick, type Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import styles from './PartnerSlider.module.css';

function LogoList({
  partners,
  locale,
  hidden,
}: {
  partners: Partner[];
  locale: Locale;
  hidden?: boolean;
}) {
  return (
    <ul className={styles.list} aria-hidden={hidden ? 'true' : undefined}>
      {partners.map((p) => (
        <li key={p.id}>
          <img
            src={p.logo}
            className={p.id === 'connecteve' ? styles.connecteve : undefined}
            alt={hidden ? '' : pick(p.name, locale)}
            width={p.width}
            height={p.height}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export function PartnerSlider({ partners, locale }: { partners: Partner[]; locale: Locale }) {
  const copies = Math.max(2, Math.ceil(6 / Math.max(partners.length, 1)));
  const half = Array.from({ length: copies }, () => partners).flat();
  return (
    <section className={styles.section} aria-labelledby="partners-heading" data-reveal-children>
      <h2 id="partners-heading" className={styles.heading} lang="en">
        {ui('partners', locale)}
      </h2>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <LogoList partners={half} locale={locale} />
          <LogoList partners={half} locale={locale} hidden />
        </div>
      </div>
    </section>
  );
}
