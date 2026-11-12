import { Icon } from '@/components/ui/Icon';
import type { Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import styles from './Pagination.module.css';

function pageList(page: number, count: number): (number | null)[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = new Set([1, count, page - 1, page, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (page >= count - 2) [count - 3, count - 2, count - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1]! > 1 ? [null, p] : [p]));
}

export function Pagination({
  page,
  pageCount,
  onChange,
  locale,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  locale: Locale;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav className={styles.pagination} aria-label={ui('pagination', locale)}>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label={ui('previousPage', locale)}
      >
        <Icon name="chevronLeft" size={24} />
      </button>
      <ol className={styles.pages}>
        {pageList(page, pageCount).map((p, i) =>
          p === null ? (
            <li key={`gap-${i}`} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={p === page ? `${styles.page} ${styles.current}` : styles.page}
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`${ui('page', locale)} ${p}`}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ol>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label={ui('nextPage', locale)}
      >
        <Icon name="chevronRight" size={24} />
      </button>
    </nav>
  );
}
