import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BASE_CONFIG } from '../config.ts';

const excerptOf = (body: string | undefined, length = 120) => {
  if (!body) return undefined;

  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;
  return text.length > length ? `${text.slice(0, length)}…` : text;
};

export async function GET(context) {
  const posts = await getCollection('posts');
  const essays = await getCollection('essays');

  const items = [
    ...posts
      .filter(post => !!post.data.published)
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        link: `/post/${post.data.id ?? post.id}/`,
      })),
    ...essays.map(essay => ({
      title: essay.data.title,
      pubDate: essay.data.published,
      description: essay.data.description ?? excerptOf(essay.body),
      link: `/essays/${essay.data.id ?? essay.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: BASE_CONFIG.title,
    description: BASE_CONFIG.subtitle,
    site: context.site,
    items,
    customData: `<language>zh-cn</language>`,
  });
}
