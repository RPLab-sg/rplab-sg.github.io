/** Pages read content only through these functions, so a database can replace the files later. */
import { members } from '@/content/members';
import { news } from '@/content/news';
import { outputs } from '@/content/outputs';
import { partners } from '@/content/partners';
import { researchAxes } from '@/content/research';
import type { Member, NewsItem, Output, Partner, ResearchAxis } from '@/content/types';

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
    .sort((a, b) => a.order - b.order);
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
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export async function getFeaturedOutputs(): Promise<Output[]> {
  return (await getOutputs()).filter((o) => o.featured);
}
