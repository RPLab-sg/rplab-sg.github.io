import { PillButton } from '@/components/ui/PillButton';
import type { Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import styles from './Hero.module.css';

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <img
        className={styles.photo}
        src="/images/home/hero-robot.jpg"
        alt=""
        width={2880}
        height={1440}
        fetchPriority="high"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h1 id="hero-heading" className={styles.title} lang="en">
          Robot Platform
          <br />
          Laboratory
        </h1>
        <p className={styles.affiliation} lang="en">
          Department of Computer Science and Engineering <br />
          at Sogang University, Seoul, South Korea
        </p>
        <div className={styles.action}>
          <PillButton to="#join" variant="tonal">
            {ui('joinTitle', locale)}
          </PillButton>
        </div>
      </div>
    </section>
  );
}
