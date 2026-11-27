import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 时间字段统一按北京时间（UTC+8）解析。
 * 支持：
 *   published: 2026-11-27 20:35
 *   published: 2026-11-27
 *   published: 2026-11-27T20:35:00+08:00
 */
const dateField = z
  .union([z.string(), z.date()])
  .transform((value, ctx) => {
    if (value instanceof Date) return value;

    const raw = value.trim();
    if (!raw) {
      ctx.addIssue({ code: 'custom', message: '时间不能为空' });
      return z.NEVER;
    }

    // 只有日期时补上 00:00；没有时区信息时按北京时间处理
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw} 00:00` : raw;
    const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
    const iso = normalized.replace(' ', 'T') + (hasZone ? '' : '+08:00');
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({ code: 'custom', message: `无法解析时间：${raw}` });
      return z.NEVER;
    }

    return date;
  });

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: dateField,
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    id: z.string().optional(),
    slug: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.string(),
    published: dateField,
    id: z.string().optional(),
  }),
});

const feed = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/feed' }),
  schema: z.object({
    date: dateField,
    draft: z.boolean().optional(),
  }),
});

export const collections = { posts, essays, feed };
