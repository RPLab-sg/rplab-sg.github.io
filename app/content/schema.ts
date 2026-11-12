import { z } from 'zod';
import { prune } from './prune.ts';
import { memberPositions } from './roles.ts';

const required = z.string().trim().min(1, '필수 항목입니다');
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
const href = z
  .string()
  .regex(
    /^$|^(https?:\/\/|mailto:|tel:|\/)/,
    '링크는 https://, mailto:, tel: 또는 /로 시작해야 합니다',
  );
const email = z.string().regex(/^$|^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 주소 형식이 아닙니다');
const githubUrl = z
  .string()
  .regex(
    /^$|^https:\/\/github\.com\/[A-Za-z0-9-]+\/?$/,
    'https://github.com/아이디 형식이어야 합니다',
  );
const year = z.number().int().min(1990).max(2100);
const timeline = z.object({ period: localized, title: localized, note: localized.optional() });

export const memberSchema = z
  .object({
    id: z.string().optional(),
    slug,
    role: z.enum(['professor', 'phd', 'ms', 'undergraduate', 'alumni']),
    joined: year.optional(),
    graduated: year.optional(),
    status,
    name: localized,
    school: z.union([slug, localized]).optional(),
    education: z.union([slug, localized]).optional(),
    summary: localized.optional(),
    keywords: localizedList.optional(),
    email: email.optional(),
    phone: z.string().optional(),
    office: localized.optional(),
    contactSlots: z
      .object({
        github: githubUrl.nullable().default(null),
        email: email.nullable().default(null),
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
  .superRefine((m, ctx) => {
    if (m.role === 'alumni' && !m.graduated) {
      ctx.addIssue({
        code: 'custom',
        path: ['graduated'],
        message: '졸업생은 졸업 연도가 필요합니다',
      });
    }
    if (m.role !== 'undergraduate') return;
    if (!m.school)
      ctx.addIssue({
        code: 'custom',
        path: ['school'],
        message: '학부연구생은 소속 학교가 필요합니다',
      });
    if (!m.education)
      ctx.addIssue({
        code: 'custom',
        path: ['education'],
        message: '학부연구생은 소속 학과가 필요합니다',
      });
  })
  .transform(({ id, ...m }) => ({
    ...m,
    id: id ?? m.slug,
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
    year: year.optional(),
    title: localized,
    subtitle: localized,
    tag: localized,
    shortTag: localized,
    description: localized,
    featured: z.boolean().default(false),
    featuredOrder: z.number().min(1).max(99).optional(),
    image: image.optional(),
    href: href.optional(),
  })
  .transform(({ id, ...o }) => ({ ...o, id: id ?? o.slug }));

const bothLanguages = z.object({ ko: required, en: required });

export const schoolSchema = z.object({ slug, name: bothLanguages });
export const departmentSchema = z.object({ slug, name: bothLanguages });

export const contentSchemas = {
  schools: schoolSchema,
  departments: departmentSchema,
  members: memberSchema,
  news: newsSchema,
  outputs: outputSchema,
} as const;

export type ParseResult<T> = { ok: true; data: T } | { ok: false; message: string };

export function parseEntry<T>(schema: z.ZodType, raw: unknown): ParseResult<T> {
  const result = schema.safeParse(prune(raw));
  return result.success
    ? { ok: true, data: result.data as T }
    : { ok: false, message: z.prettifyError(result.error) };
}
