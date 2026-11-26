import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.coerce.date(),
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
    published: z.coerce.date(),
    id: z.string().optional(),
  }),
});

const feed = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/feed' }),
  schema: z.object({
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { posts, essays, feed };

