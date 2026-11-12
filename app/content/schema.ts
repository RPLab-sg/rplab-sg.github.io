/**
 * Schemas for the JSON content that Pages CMS edits (members, news, outputs).
 * Pages CMS leaves out fields that were never filled in, so every entry is pruned and parsed here:
 * blank optional fields read as absent, defaults fill the rest, and an entry missing a required
 * field is rejected instead of crashing a page. Keep in step with `types.ts` and `.pages.yml`.
 * Runs only at build time (loaders and prerender), so zod never reaches the browser bundle.
 */
import { z } from 'zod';
import { prune } from './prune.ts';
import { memberPositions } from './roles.ts';

const required = z.string().trim().min(1, '필수 항목입니다');
/** Korean is required; an empty English value falls back to Korean on the English site. */
const localized = z.object(
  { ko: required, en: z.string().default('') },
  { error: '필수 항목입니다 (한국어는 꼭 입력)' },
);
const localizedText = z.object({ ko: z.string().default(''), en: z.string().default('') });
const localizedList = z
  .object({ ko: z.array(z.string()).default([]), en: z.array(z.string()).default([]) })
  .default({ ko: [], en: [] });
const status = z.enum(['draft', 'published']).default('published');
const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '영문 소문자, 숫자, 하이픈(-)만 쓸 수 있습니다');
const image = z.object({
  src: z
    .string()
    .regex(
      /^\/images\/[A-Za-z0-9._/-]+$/,
      '이미지 파일 이름은 영문, 숫자, 하이픈(-)만 쓸 수 있습니다 (한글, 공백 불가). 파일 이름을 바꿔 다시 올려 주세요',
    ),
  alt: localizedText.default({ ko: '', en: '' }),
});
/** Links may only be web, mail or phone addresses, or a path on this site (never `javascript:`). */
const href = z
  .string()
  .regex(
    /^$|^(https?:\/\/|mailto:|tel:|\/)/,
    '링크는 https://, mailto:, tel: 또는 /로 시작해야 합니다',
  );
const timeline = z.object({ period: localized, title: localized, note: localized.optional() });

export const memberSchema = z
  .object({
    /** Old entries carry an `id`; new ones use the slug. */
    id: z.string().optional(),
    slug,
    role: z.enum(['professor', 'phd', 'ms', 'undergraduate', 'alumni']),
    order: z.number().default(10),
    status,
    name: localized,
    education: localized.optional(),
    summary: localized.optional(),
    keywords: localizedList.optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    office: localized.optional(),
    contactSlots: z
      .object({
        github: href.nullable().default(null),
        email: z.string().nullable().default(null),
      })
      .optional(),
    photo: image.optional(),
    links: z
      .array(
        z.object({
          kind: required,
          label: localized,
          href: href.optional(),
          external: z.boolean().default(true),
        }),
      )
      .optional(),
    detail: z
      .object({
        summary: localized,
        research: z.array(z.object({ title: localized, body: localized })).default([]),
        experience: z.array(timeline).default([]),
        education: z.array(timeline).default([]),
        activities: z.array(timeline).default([]),
        source: localized.optional(),
      })
      .optional(),
  })
  .transform(({ id, ...m }) => ({
    ...m,
    id: id ?? m.slug,
    // Position follows the role, so the CMS only asks for the role.
    position: memberPositions[m.role],
  }));

export const newsSchema = z
  .object({
    id: z.string().optional(),
    slug,
    status,
    publishedAt: z
      .string()
      .regex(/^\d{4}(-\d{2}-\d{2})?$/, 'YYYY 또는 YYYY-MM-DD 형식이어야 합니다'),
    category: z.enum(['award', 'research', 'event', 'notice']),
    title: localized,
    detail: localized.optional(),
    summary: localized,
    body: localizedList,
    cover: image.optional(),
  })
  .transform(({ id, ...n }) => ({ ...n, id: id ?? n.slug }));

export const outputSchema = z
  .object({
    id: z.string().optional(),
    slug,
    status,
    type: z.enum(['tech-transfer', 'collaboration', 'paper', 'project']),
    year: z.number().int().optional(),
    title: localized,
    subtitle: localized,
    tag: localized,
    shortTag: localized,
    description: localized,
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    image: image.optional(),
    href: href.optional(),
  })
  .transform(({ id, ...o }) => ({ ...o, id: id ?? o.slug }));

export const contentSchemas = {
  members: memberSchema,
  news: newsSchema,
  outputs: outputSchema,
} as const;

export type ParseResult<T> = { ok: true; data: T } | { ok: false; message: string };

/** Prunes and validates one raw JSON entry. */
export function parseEntry<T>(schema: z.ZodType, raw: unknown): ParseResult<T> {
  const result = schema.safeParse(prune(raw));
  return result.success
    ? { ok: true, data: result.data as T }
    : { ok: false, message: z.prettifyError(result.error) };
}
