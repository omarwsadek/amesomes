import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// heroImage is a public URL string (e.g. /uploads/foo.jpg) so the CMS can
// upload images into /public and reference them with an absolute path.
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.string().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		url: z.string().optional(),
		// Paste a YouTube/Vimeo link or a direct .mp4 URL to embed a video.
		video: z.string().optional(),
		heroImage: z.string().optional(),
	}),
});

const podcast = defineCollection({
	loader: glob({ base: './src/content/podcast', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		// Paste the Spotify episode share link; it gets embedded automatically.
		spotify: z.string().optional(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog, projects, podcast };
