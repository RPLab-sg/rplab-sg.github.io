import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

export const PAGE_SIZE = 10;

const noSubscribe = () => () => {};
const readUrlPage = () => {
  const page = Number(new URLSearchParams(window.location.search).get('page'));
  return Number.isInteger(page) && page > 1 ? page : 1;
};

/**
 * Splits `items` into pages and keeps the page in `?page=` so a refresh or a shared link
 * lands on the same page. The prerendered HTML is page 1 (the server snapshot), and the URL
 * is read once hydrated. Changing `resetKey` (e.g. a filter) returns to page 1.
 */
export function usePagination<T>(
  items: T[],
  options: { resetKey?: unknown; scrollTarget?: RefObject<HTMLElement | null> } = {},
) {
  const { resetKey, scrollTarget } = options;
  const urlPage = useSyncExternalStore(noSubscribe, readUrlPage, () => 1);
  // `page: null` = nothing chosen yet, so follow the URL.
  const [chosen, setChosen] = useState<{ page: number | null; key: unknown }>({
    page: null,
    key: resetKey,
  });
  let page = chosen.page ?? urlPage;
  if (chosen.key !== resetKey) {
    setChosen({ page: 1, key: resetKey });
    page = 1;
  }

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) writePage(1);
    mounted.current = true;
  }, [resetKey]);

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(1, next), pageCount);
    setChosen({ page: clamped, key: resetKey });
    writePage(clamped);
    const target = scrollTarget?.current;
    if (target && target.getBoundingClientRect().top < 0) {
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    }
  };

  const start = (current - 1) * PAGE_SIZE;
  return { page: current, pageCount, goTo, pageItems: items.slice(start, start + PAGE_SIZE) };
}

/** Updates `?page=` in place, keeping React Router's history state intact. */
function writePage(page: number) {
  const url = new URL(window.location.href);
  if (page > 1) url.searchParams.set('page', String(page));
  else url.searchParams.delete('page');
  window.history.replaceState(window.history.state, '', url);
}
