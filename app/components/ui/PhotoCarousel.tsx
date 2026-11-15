import { useRef, useState, type PointerEvent } from 'react';
import type { ImageRef } from '@/content/types';
import { pick, type Locale } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import styles from './PhotoCarousel.module.css';

export function PhotoCarousel({
  images,
  locale,
  className,
}: {
  images: ImageRef[];
  locale: Locale;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.min(Math.max(i, 0), images.length - 1);
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.setPointerCapture(e.pointerId);
    track.current.dataset.dragging = '';
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!drag.current || !el) return;
    const moved = drag.current.x - e.clientX;
    const start = Math.round(drag.current.left / el.clientWidth);
    drag.current = null;
    delete el.dataset.dragging;
    goTo(Math.abs(moved) > el.clientWidth * 0.15 ? start + Math.sign(moved) : start);
  };

  return (
    <div
      className={[styles.carousel, className ?? ''].join(' ')}
      role="region"
      aria-roledescription="carousel"
      aria-label={ui('photoGallery', locale)}
    >
      <div
        ref={track}
        className={styles.track}
        tabIndex={0}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(index + 1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
      >
        {images.map((image, i) => (
          <img
            key={image.src}
            className={styles.slide}
            src={image.src}
            alt={pick(image.alt, locale)}
            draggable={false}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index || undefined}
          />
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={styles.dot}
            aria-label={ui('photoN', locale).replace('{n}', String(i + 1))}
            aria-current={i === index || undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
