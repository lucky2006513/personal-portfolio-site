import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/[^_]*.md',
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    status: z.string(),
    year: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    stack: z.array(z.string()).min(1),
    highlights: z.array(z.string()).default([]),
    challenge: z.string(),
    solution: z.string(),
    outcome: z.string(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
