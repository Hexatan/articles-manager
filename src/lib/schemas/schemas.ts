import { z } from 'zod';

// Define the article schema with validation rules
export const articleSchema = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title must be a string'
		})
		.min(1, { message: 'Title cannot be empty' })
		.max(100, { message: 'Title cannot be longer than 100 characters' }),

	author: z
		.string({
			required_error: 'Author is required',
			invalid_type_error: 'Author must be a string'
		})
		.min(1, { message: 'Author name cannot be empty' }),

	status: z.enum(['published', 'draft', 'in_review'], {
		errorMap: (issue, ctx) => {
			if (issue.code === 'invalid_type') {
				return { message: 'Status is required' };
			}
			if (issue.code === 'invalid_enum_value') {
				return { message: 'Status must be one of: published, draft, in_review' };
			}
			return { message: ctx.defaultError };
		}
	})
});

// Type for a validated article
export type Article = z.infer<typeof articleSchema>;

// Optional fields version for partial updates
export const articlePatchSchema = articleSchema.partial();
export type ArticlePatch = z.infer<typeof articlePatchSchema>;
