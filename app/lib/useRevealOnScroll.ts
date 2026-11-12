import { useEffect } from 'react';

const BLOCKS = '[data-reveal-children] > :not([data-reveal-children])';

export function useRevealOnScroll(key?: unknown) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const blocks = Array.from(document.querySelectorAll<HTMLElement>(BLOCKS));
    const finish = (el: HTMLElement) => {
      el.removeAttribute('data-reveal');
      el.style.transitionDelay = '';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            observer.unobserve(el);
            el.style.transitionDelay = `${i * 90}ms`;
            el.dataset.reveal = 'shown';
            const onEnd = (ev: TransitionEvent) => {
              if (ev.target !== el) return;
              el.removeEventListener('transitionend', onEnd);
              finish(el);
            };
            el.addEventListener('transitionend', onEnd);
          });
      },
      { rootMargin: '100000px 0px -12% 0px' },
    );

    for (const el of blocks) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) continue;
      el.dataset.reveal = 'hidden';
      observer.observe(el);
    }
    return () => {
      observer.disconnect();
      blocks.forEach(finish);
    };
  }, [key]);
}
