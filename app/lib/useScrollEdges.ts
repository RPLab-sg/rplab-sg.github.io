import { useCallback, useEffect, useState, type RefObject } from 'react';

export interface ScrollEdges {
  canBack: boolean;
  canForward: boolean;
}

export function useScrollEdges(ref: RefObject<HTMLElement | null>, axis: 'x' | 'y'): ScrollEdges {
  const [edges, setEdges] = useState<ScrollEdges>({ canBack: false, canForward: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const pos = axis === 'x' ? el.scrollLeft : el.scrollTop;
    const max = axis === 'x' ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
    const next = { canBack: pos > 2, canForward: pos < max - 2 };
    setEdges((prev) =>
      prev.canBack === next.canBack && prev.canForward === next.canForward ? prev : next,
    );
  }, [ref, axis]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      resize.disconnect();
    };
  }, [ref, measure]);

  return edges;
}
