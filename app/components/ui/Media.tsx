import type { ImageRef } from '@/content/types';
import { pick, type Locale } from '@/i18n/locale';

interface Props {
  image?: ImageRef | undefined;
  locale: Locale;
  className: string;
  decorative?: boolean;
  width?: number;
  height?: number;
  eager?: boolean;
}

export function Media({ image, locale, className, decorative, width, height, eager }: Props) {
  if (!image) return <span className={className} aria-hidden="true" />;
  return (
    <img
      className={className}
      src={image.src}
      alt={decorative ? '' : pick(image.alt, locale)}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
    />
  );
}
