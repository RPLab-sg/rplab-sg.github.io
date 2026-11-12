import {
  departmentSchema,
  memberSchema,
  newsSchema,
  outputSchema,
  parseEntry,
  schoolSchema,
} from '@/content/schema';
import { partners } from '@/content/partners';
import { researchAxes } from '@/content/research';
import type { Localized } from '@/i18n/locale';
import type { Affiliation, Member, NewsItem, Output, Partner, ResearchAxis } from '@/content/types';

function entries<T>(files: Record<string, unknown>, schema: Parameters<typeof parseEntry>[0]): T[] {
  return Object.entries(files).flatMap(([path, raw]) => {
    const result = parseEntry<T>(schema, raw);
    if (result.ok) return [result.data];
    console.warn(`[content] skipped ${path}\n${result.message}`);
    return [];
  });
}

const byslug = (list: Affiliation[]) => new Map(list.map((a) => [a.slug, a.name]));
const schools = byslug(
  entries<Affiliation>(
    import.meta.glob('../content/schools/*.json', { eager: true, import: 'default' }),
    schoolSchema,
  ),
);
const departments = byslug(
  entries<Affiliation>(
    import.meta.glob('../content/departments/*.json', { eager: true, import: 'default' }),
    departmentSchema,
  ),
);

type RawMember = Omit<Member, 'school' | 'education'> & {
  school?: string;
  education?: string;
};

function resolve(value: string | undefined, names: Map<string, Localized>) {
  return value === undefined ? undefined : names.get(value);
}

const members = entries<RawMember>(
  import.meta.glob('../content/members/*.json', { eager: true, import: 'default' }),
  memberSchema,
).map(({ school, education, ...m }): Member => {
  const resolved = { school: resolve(school, schools), education: resolve(education, departments) };
  return {
    ...m,
    ...(resolved.school && { school: resolved.school }),
    ...(resolved.education && { education: resolved.education }),
  };
});
const news = entries<NewsItem>(
  import.meta.glob('../content/news/*.json', { eager: true, import: 'default' }),
  newsSchema,
);
const outputs = entries<Output>(
  import.meta.glob('../content/outputs/*.json', { eager: true, import: 'default' }),
  outputSchema,
);

const bySeniority = (a: Member, b: Member) =>
  (a.joined ?? Infinity) - (b.joined ?? Infinity) || a.name.ko.localeCompare(b.name.ko, 'ko');

const byPublishedDesc = (a: NewsItem, b: NewsItem) => b.publishedAt.localeCompare(a.publishedAt);

export async function getResearchAxes(): Promise<ResearchAxis[]> {
  return [...researchAxes].sort((a, b) => a.order - b.order);
}

export async function getPartners(): Promise<Partner[]> {
  return [...partners].sort((a, b) => a.order - b.order);
}

export async function getMembers(): Promise<{ professors: Member[]; students: Member[] }> {
  const published = members
    .filter((m) => m.status === 'published' && m.role !== 'alumni')
    .sort(bySeniority);
  return {
    professors: published.filter((m) => m.role === 'professor'),
    students: published.filter((m) => m.role !== 'professor'),
  };
}

export async function getMemberBySlug(slug: string): Promise<Member | undefined> {
  return members.find((m) => m.slug === slug && m.status === 'published');
}

export async function getNews(limit?: number): Promise<NewsItem[]> {
  const list = news.filter((n) => n.status === 'published').sort(byPublishedDesc);
  return limit === undefined ? list : list.slice(0, limit);
}

export async function getOutputs(): Promise<Output[]> {
  return outputs
    .filter((o) => o.status === 'published')
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity) ||
        (b.year ?? 0) - (a.year ?? 0),
    );
}

export async function getFeaturedOutputs(): Promise<Output[]> {
  return (await getOutputs())
    .filter((o) => o.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity));
}
