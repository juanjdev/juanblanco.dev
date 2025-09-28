// Content Collections configuration
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // Content collection for markdown files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Juan José Blanco'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.enum(['tech', 'personal', 'tutorial', 'thoughts']).default('tech'),
  }),
});

const projectsCollection = defineCollection({
  type: 'content', // For detailed project pages
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    category: z.enum(['web-app', 'mobile', 'ai', 'e-commerce', 'tool']),
    status: z.enum(['completed', 'in-progress', 'concept']).default('completed'),
    featured: z.boolean().default(false),
    image: z.string(),
    images: z.array(z.string()).optional(), // Additional project images
    liveDemo: z.string().url().optional(),
    code: z.string().url().optional(),
    year: z.number(),
    client: z.string().optional(),
    duration: z.string().optional(), // e.g., "3 months"
    team: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};