import { Fragment } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import logo from '@/assets/logo.svg';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { locales, localizePath, pick, switchLocalePath, type Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import tabs from '@/components/ui/Tabs.module.css';
import styles from './Header.module.css';

const langLabels: Record<Locale, string> = { ko: 'KR', en: 'ENG' };

export function Header({ locale }: { locale: Locale }) {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          to={localizePath('/', locale)}
          className={styles.brand}
          aria-label={ui('homeLabel', locale)}
        >
          <img src={logo} alt="" width={53} height={42} />
          <span className={styles.wordmark}>
            <strong>{site.name}</strong>
            <small>{site.fullName}</small>
          </span>
        </Link>
        <div className={styles.end}>
          <nav className={styles.nav} aria-label={ui('mainMenu', locale)}>
            <ul>
              {navigation.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={localizePath(item.path, locale)}
                    className={({ isActive }) =>
                      isActive ? `${tabs.tab} ${tabs.active}` : tabs.tab
                    }
                  >
                    {item.shortLabel ? (
                      <>
                        <span className={styles.fullLabel}>{pick(item.label, locale)}</span>
                        <span className={styles.shortLabel}>{pick(item.shortLabel, locale)}</span>
                      </>
                    ) : (
                      pick(item.label, locale)
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.lang} role="group" aria-label={ui('languageSwitch', locale)}>
            {locales.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && (
                  <span className={styles.slash} aria-hidden="true">
                    /
                  </span>
                )}
                <Link
                  to={switchLocalePath(pathname, l)}
                  lang={l}
                  hrefLang={l}
                  aria-current={locale === l ? 'true' : undefined}
                  className={locale === l ? styles.langActive : styles.langLink}
                >
                  {langLabels[l]}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
