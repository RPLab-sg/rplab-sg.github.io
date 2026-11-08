import { useLoaderData } from 'react-router';
import { SubPage } from '@/components/layout/SubPage';
import { Media } from '@/components/ui/Media';
import { pick } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { getNews } from '@/lib/content';
import { newsCategoryLabels } from '@/lib/labels';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';
import styles from './news.module.css';

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, { items: await getNews() });
}

export const meta = staticMeta('News');

export default function NewsPage() {
  const { locale, items } = useLoaderData<typeof loader>();
  return (
    <SubPage title="News">
      {items.length > 0 ? (
        <div>
          <div className={styles.head} aria-hidden="true">
            <span>Date</span>
            <span>Category</span>
            <span>Title</span>
            <span />
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <article className={styles.row}>
                  <span className={styles.date}>{item.publishedAt}</span>
                  <span className={styles.category}>
                    {pick(newsCategoryLabels[item.category], locale)}
                  </span>
                  <span className={styles.title}>
                    <span className={styles.headline}>{pick(item.title, locale)}</span>
                    {item.detail && (
                      <span className={styles.detail}>{pick(item.detail, locale)}</span>
                    )}
                  </span>
                  <span className={styles.thumbSlot}>
                    {item.cover && (
                      <Media
                        image={item.cover}
                        locale={locale}
                        className={styles.thumb}
                        decorative
                      />
                    )}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{ui('noNews', locale)}</p>
      )}
    </SubPage>
  );
}
