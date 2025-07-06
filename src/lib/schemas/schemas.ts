import * as z from 'zod/v4';

// Define the article schema with validation rules
export const articleSchema = z
	.strictObject({
		title: z.string().min(1, { message: 'Title is required' }).max(100),
		author: z.string().min(1, { message: 'Author is required' }),
		status: z.enum(['published', 'draft', 'in_review'], { message: 'Status is required' })
	})
	.required({ title: true, author: true, status: true });

// Type for a validated article
export type Article = z.infer<typeof articleSchema>;

// Optional fields version for partial updates
export const articlePatchSchema = articleSchema.partial();
export type ArticlePatch = z.infer<typeof articlePatchSchema>;
