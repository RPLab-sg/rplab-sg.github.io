/**
 * Checks the JSON content that Pages CMS edits (members, news, outputs) before it is built.
 * Run by `npm run check`, so a malformed entry fails CI instead of breaking the live site.
 * Keep these schemas in step with `app/content/types.ts`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { z } from 'zod';
import { prune } from '../app/content/prune.ts';

const text = z.string();
const localized = z.strictObject({ ko: text, en: text });
const localizedList = z.strictObject({ ko: z.array(text), en: z.array(text) });
const status = z.enum(['draft', 'published']);
const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase letters, digits and hyphens');
const image = z.strictObject({ src: z.string().startsWith('/images/'), alt: localized });
const timeline = z.strictObject({
  period: localized,
  title: localized,
  note: localized.optional(),
});

const member = z.strictObject({
  id: z.string().min(1),
  slug,
  role: z.enum(['professor', 'phd', 'ms', 'undergraduate', 'alumni']),
  order: z.number(),
  status,
  name: localized,
  position: localized,
  education: localized.optional(),
  summary: localized.optional(),
  keywords: localizedList.optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  office: localized.optional(),
  contactSlots: z
    .strictObject({ github: z.string().nullable(), email: z.string().nullable() })
    .optional(),
  photo: image.optional(),
  links: z
    .array(
      z.strictObject({
        kind: z.string(),
        label: localized,
        href: z.string().optional(),
        external: z.boolean(),
      }),
    )
    .optional(),
  detail: z
    .strictObject({
      summary: localized,
      research: z.array(z.strictObject({ title: localized, body: localized })),
      experience: z.array(timeline),
      education: z.array(timeline),
      activities: z.array(timeline),
      source: localized.optional(),
    })
    .optional(),
});

const newsItem = z.strictObject({
  id: z.string().min(1),
  slug,
  status,
  publishedAt: z.string().regex(/^\d{4}(-\d{2}-\d{2})?$/, 'YYYY or YYYY-MM-DD'),
  category: z.enum(['award', 'research', 'event', 'notice']),
  title: localized,
  detail: localized.optional(),
  summary: localized,
  body: localizedList,
  cover: image.optional(),
});

const output = z.strictObject({
  id: z.string().min(1),
  slug,
  status,
  type: z.enum(['tech-transfer', 'collaboration', 'paper', 'project']),
  year: z.number().int().optional(),
  title: localized,
  subtitle: localized,
  tag: localized,
  shortTag: localized,
  description: localized,
  featured: z.boolean(),
  featuredOrder: z.number().optional(),
  image: image.optional(),
  href: z.string().optional(),
});

const collections = { members: member, news: newsItem, outputs: output };
let failed = false;

for (const [name, schema] of Object.entries(collections)) {
  const dir = `app/content/${name}`;
  const seen = new Set<string>();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const where = `${dir}/${file}`;
    const fail = (message: string) => {
      failed = true;
      console.error(`✗ ${where}\n  ${message}`);
    };
    let data: unknown;
    try {
      data = prune(JSON.parse(readFileSync(where, 'utf8')));
    } catch (error) {
      fail(`invalid JSON: ${(error as Error).message}`);
      continue;
    }
    const result = schema.safeParse(data);
    if (!result.success) {
      fail(z.prettifyError(result.error).replaceAll('\n', '\n  '));
      continue;
    }
    if (seen.has(result.data.slug)) fail(`duplicate slug "${result.data.slug}"`);
    seen.add(result.data.slug);
    const entry: { photo?: { src: string }; image?: { src: string }; cover?: { src: string } } =
      result.data;
    const src = (entry.photo ?? entry.image ?? entry.cover)?.src;
    if (src && !existsSync(`public${src}`)) fail(`image not found: public${src}`);
  }
}

if (failed) process.exit(1);
console.log('Content OK');
