import { defineCollection, z } from 'astro:content';

const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.date().optional(),
  }),
});

export const collections = {
  legal: legalCollection,
};