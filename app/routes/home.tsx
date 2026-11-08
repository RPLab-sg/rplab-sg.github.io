import { useLoaderData } from 'react-router';
import { Hero } from '@/components/home/Hero';
import {
  FeaturedProjects,
  JoinBand,
  LatestNews,
  ResearchAreas,
} from '@/components/home/HomeBlocks';
import { PartnerSlider } from '@/components/home/PartnerSlider';
import { getFeaturedOutputs, getNews, getPartners, getResearchAxes } from '@/lib/content';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';

export async function loader({ request }: LoaderArgs) {
  const [partners, axes, featured, allNews] = await Promise.all([
    getPartners(),
    getResearchAxes(),
    getFeaturedOutputs(),
    getNews(),
  ]);
  const awardYears = allNews
    .filter((n) => n.category === 'award')
    .map((n) => n.publishedAt.slice(0, 4))
    .sort();
  const stats = {
    awards: awardYears.length,
    from: awardYears[0] ?? '',
    to: awardYears[awardYears.length - 1] ?? '',
  };
  return withLocale(request, { partners, axes, featured, news: allNews.slice(0, 3), stats });
}

export const meta = staticMeta();

export default function HomePage() {
  const { locale, partners, axes, featured, news, stats } = useLoaderData<typeof loader>();
  return (
    <>
      <Hero locale={locale} />
      <PartnerSlider partners={partners} locale={locale} />
      <ResearchAreas axes={axes} locale={locale} />
      <FeaturedProjects outputs={featured} locale={locale} />
      <LatestNews items={news} stats={stats} locale={locale} />
      <JoinBand locale={locale} />
    </>
  );
}
