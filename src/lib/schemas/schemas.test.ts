import { describe, it, expect } from 'vitest';
import { articleSchema } from './schemas';

describe('Article Schema', () => {
  it('should validate a valid article', () => {
    const validArticle = {
      title: 'Test Article',
      author: 'John Doe',
      status: 'published',
    };

    const result = articleSchema.safeParse(validArticle);
    expect(result.success).toBe(true);
  });

  it('should validate a valid article with all possible status values', () => {
    const statuses = ['published', 'draft', 'in_review'];

    for (const status of statuses) {
      const article = {
        title: 'Test Article',
        author: 'John Doe',
        status,
      };

      const result = articleSchema.safeParse(article);
      expect(result.success).toBe(true);
    }
  });

  it('should reject an article with missing required fields', () => {
    const invalidArticle = {
      title: 'Test Article'
      // Missing author, status
    };

    const result = articleSchema.safeParse(invalidArticle);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.author?._errors).toBeDefined();
      expect(formattedErrors.status?._errors).toBeDefined();
    }
  });

  it('should reject an article with invalid status', () => {
    const invalidArticle = {
      title: 'Test Article',
      author: 'John Doe',
      status: 'invalid_status', // Invalid status
    };

    const result = articleSchema.safeParse(invalidArticle);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.status?._errors).toBeDefined();
    }
  });

  it('should reject an article with empty title', () => {
    const invalidArticle = {
      title: '',
      author: 'John Doe',
      status: 'published',
    };

    const result = articleSchema.safeParse(invalidArticle);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.title?._errors).toBeDefined();
    }
  });

  it('should reject an article with title that is too long', () => {
    const invalidArticle = {
      title: 'A'.repeat(101), // Title longer than 100 characters
      author: 'John Doe',
      status: 'published',
    };

    const result = articleSchema.safeParse(invalidArticle);
    expect(result.success).toBe(false);

    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.title?._errors).toBeDefined();
    }
  });
});
