/// <reference types="cypress" />
describe('Create Article', () => {
	it('should allow creating a new article', () => {
		// Visit the admin articles page
		cy.visit('/admin/articles');

		// Click on the "New Article" button
		cy.contains('New Article').click();

		// Should be redirected to the new article page
		cy.url().should('include', '/admin/articles/new');

		// Fill out the form
		const testTitle = 'Test Article Title';
		const testAuthor = 'Test Author';

		cy.get('input[name="title"]').type(testTitle);
		cy.get('input[name="author"]').type(testAuthor);
		cy.get('select[name="status"]').select('published');

		// Submit the form
		cy.get('button[type="submit"]').click();

		// Should be redirected back to the articles list
		cy.url().should('include', '/admin/articles');
		cy.url().should('not.include', '/new');

		// The new article should be visible in the list
		cy.contains(testTitle).should('be.visible');
		cy.contains(testAuthor).should('be.visible');
		cy.contains('published').should('be.visible');
	});

	it('should validate the form fields', () => {
		// Visit the new article page directly
		cy.visit('/admin/articles/new');

		// Try to submit the form without filling any fields
		cy.get('button[type="submit"]').click();

		// Should show validation errors
		cy.contains('Title is required').should('be.visible');
		cy.contains('Author is required').should('be.visible');
		cy.contains('Status is required').should('be.visible');

		// Fill out only the title
		cy.get('input[name="title"]').type('Test Title');
		cy.get('button[type="submit"]').click();

		// Should still show validation errors for author and status
		cy.contains('Author is required').should('be.visible');
		cy.contains('Status is required').should('be.visible');

		// URL should still be the new article page
		cy.url().should('include', '/admin/articles/new');
	});
});
