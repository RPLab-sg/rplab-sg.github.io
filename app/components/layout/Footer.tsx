import { site } from '@/config/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.identity}>
        <span>
          {site.name} · {site.fullName}
        </span>
        <address>{site.footerAddress}</address>
      </div>
      <small>© {site.name}. All rights reserved.</small>
    </footer>
  );
}
