/** Keep this file free of `@/` imports: `react-router.config.ts` loads content files directly. */
import type { Localized } from '../i18n/locale';

export type PublishStatus = 'draft' | 'published';

export interface ImageRef {
  src: string;
  alt: Localized;
}

export interface ResearchAxis {
  id: string;
  order: number;
  title: string;
  summary: Localized;
  keywords: Localized<string[]>;
  body: Localized<string[]>;
  image?: ImageRef;
}

export type MemberRole = 'professor' | 'phd' | 'ms' | 'undergraduate' | 'alumni';

export interface MemberLink {
  kind: string;
  label: Localized;
  /** Empty `href` shows the link without making it clickable. */
  href?: string;
  external: boolean;
}

export interface TimelineEntry {
  period: Localized;
  title: Localized;
  note?: Localized;
}

export interface MemberDetail {
  summary: Localized;
  research: { title: Localized; body: Localized }[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  activities: TimelineEntry[];
  source?: Localized;
}

/** Per-member contact slots. `null` = show the icon now, connect the address later. */
export interface MemberContactSlots {
  github: string | null;
  email: string | null;
}

export interface Member {
  id: string;
  slug: string;
  role: MemberRole;
  order: number;
  status: PublishStatus;
  name: Localized;
  position: Localized;
  education?: Localized;
  summary?: Localized;
  keywords?: Localized<string[]>;
  email?: string;
  phone?: string;
  office?: Localized;
  contactSlots?: MemberContactSlots;
  photo?: ImageRef;
  links?: MemberLink[];
  detail?: MemberDetail;
}

export type NewsCategory = 'award' | 'research' | 'event' | 'notice';

export interface NewsItem {
  id: string;
  slug: string;
  status: PublishStatus;
  /** ISO date (YYYY-MM-DD) or year (YYYY) when the exact date is unknown. */
  publishedAt: string;
  category: NewsCategory;
  title: Localized;
  detail?: Localized;
  summary: Localized;
  body: Localized<string[]>;
  cover?: ImageRef;
}

export type OutputType = 'tech-transfer' | 'collaboration' | 'paper' | 'project';

export interface Output {
  id: string;
  slug: string;
  status: PublishStatus;
  type: OutputType;
  year?: number;
  title: Localized;
  subtitle: Localized;
  tag: Localized;
  shortTag: Localized;
  description: Localized;
  featured: boolean;
  image?: ImageRef;
  href?: string;
}

export interface Partner {
  id: string;
  order: number;
  name: Localized;
  logo: string;
  /** Display size in CSS pixels, tuned so the logos look optically even. */
  width: number;
  height: number;
  href?: string;
}
