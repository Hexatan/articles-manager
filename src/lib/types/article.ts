import { z } from 'zod/v4';
import { articleSchema } from '$lib/schemas/schemas';

/**
 * Interface for Article objects throughout the application
 * Extends the base schema with additional properties for complete articles
 */
export interface Article {
	id: string;
	title: string;
	author: string;
	status: 'published' | 'draft' | 'in_review';
	createdAt: string;
}

/**
 * Type for article creation/update payloads
 * Uses the schema validation from schemas.ts
 */
export type ArticlePayload = z.infer<typeof articleSchema>;
