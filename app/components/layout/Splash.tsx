import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '@/config/site';

const TYPE_START_MS = 0;
const TYPE_STEP_MS = 36;

const FAST_FORWARD_MS = 250;

const HOLD_MS = 120;
const FADE_OUT_MS = 200;

const strokes = [
  { d: 'M96.8 133.1V24.2', delay: 0, duration: 220 },
  {
    d: 'M96.8 24.2H56.1C42.1666 24.2 35.2 31.1667 35.2 45.1V58.3C35.2 72.2333 42.1666 79.2 56.1 79.2H96.8',
    delay: 180,
    duration: 320,
  },
  {
    d: 'M96.8 79.2H137.5C151.433 79.2 158.4 72.2333 158.4 58.3V45.1C158.4 31.1667 151.433 24.2 137.5 24.2H96.8',
    delay: 460,
    duration: 320,
  },
  { d: 'M63.8 79.2L35.2 133.1', delay: 760, duration: 140 },
];

type Phase = 'visible' | 'leaving' | 'gone';

function waitForLoad(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, Math.max(0, ms)));
}

async function fastForward(root: HTMLElement): Promise<void> {
  const animations = root
    .getAnimations({ subtree: true })
    .filter((a) => (a as CSSAnimation).animationName !== 'splash-failsafe')
    .filter((a) => Number.isFinite(a.effect?.getComputedTiming().endTime as number));

  const remaining = Math.max(
    0,
    ...animations.map((a) => {
      const end = Number(a.effect?.getComputedTiming().endTime ?? 0);
      return end - Number(a.currentTime ?? 0);
    }),
  );
  if (remaining > FAST_FORWARD_MS) {
    const rate = remaining / FAST_FORWARD_MS;
    animations.forEach((a) => a.updatePlaybackRate(rate));
  }
  await Promise.all(animations.map((a) => a.finished.catch(() => undefined)));
}

export function Splash() {
  const [phase, setPhase] = useState<Phase>('visible');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    waitForLoad()
      .then(() => (rootRef.current ? fastForward(rootRef.current) : undefined))
      .then(() => wait(HOLD_MS))
      .then(() => {
        if (cancelled) return;
        setPhase('leaving');
        return wait(FADE_OUT_MS);
      })
      .then(() => {
        if (!cancelled) setPhase('gone');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      ref={rootRef}
      className={phase === 'leaving' ? 'splash splash--leaving' : 'splash'}
      aria-hidden="true"
    >
      <div className="splash__inner">
        <svg
          className="splash__mark"
          width="96"
          height="88"
          viewBox="24 12 146 134"
          fill="none"
          focusable="false"
        >
          <g className="splash__guide">
            {strokes.map((s) => (
              <path key={s.d} d={s.d} />
            ))}
          </g>
          {strokes.map((s) => (
            <path
              key={s.d}
              d={s.d}
              pathLength={1}
              className="splash__stroke"
              style={{ '--delay': `${s.delay}ms`, '--dur': `${s.duration}ms` } as CSSProperties}
            />
          ))}
        </svg>
        <p
          className="splash__name"
          style={
            {
              '--type-start': `${TYPE_START_MS}ms`,
              '--type-step': `${TYPE_STEP_MS}ms`,
            } as CSSProperties
          }
        >
          <span className="splash__ghost">{site.fullName}</span>
          <span className="splash__typed">
            {[...site.fullName].map((char, i) => (
              <span key={i} className="splash__char" style={{ '--i': i } as CSSProperties}>
                {char}
              </span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
}
