/**
 * Article Schema Definitions
 *
 * This module defines the validation schemas and TypeScript types for articles
 * using Zod validation library. The schemas ensure data consistency and type safety
 * throughout the application.
 *
 * Key components:
 * - articleSchema: Defines the structure and validation rules for complete articles
 * - articlePatchSchema: A partial version of the schema for update operations
 * - Associated TypeScript types generated from the schemas
 *
 * The strict validation ensures:
 * - Required fields are present
 * - String length constraints are met
 * - Status values are from a predefined set
 *
 * Used in:
 * - API request validation
 * - Form validation
 * - Type checking during development
 */

import * as z from 'zod/v4';

export const articleSchema = z
	.strictObject({
		title: z.string().min(1, { message: 'Title is required' }).max(100),
		author: z.string().min(1, { message: 'Author is required' }),
		status: z.enum(['published', 'draft', 'in_review'], { message: 'Status is required' })
	})
	.required({ title: true, author: true, status: true });

export type Article = z.infer<typeof articleSchema>;

export const articlePatchSchema = articleSchema.partial();
export type ArticlePatch = z.infer<typeof articlePatchSchema>;
