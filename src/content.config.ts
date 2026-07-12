import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Optional editorial category, shown on cards + post header.
			category: z.string().optional(),
			heroImage: z.optional(image()),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			// Optional tags + an optional external link (live site, repo, etc.)
			tags: z.array(z.string()).optional(),
			url: z.string().optional(),
			// Paste a YouTube/Vimeo link or a direct .mp4 URL to embed a video.
			video: z.string().optional(),
			heroImage: z.optional(image()),
		}),
});

const podcast = defineCollection({
	loader: glob({ base: './src/content/podcast', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			// Paste the Spotify episode share link; it gets embedded automatically.
			spotify: z.string().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog, projects, podcast };
