import { createServer, Model, Response } from 'miragejs';
import { articleFactory } from './factories/article';

export function makeServer({ environment = 'development' } = {}) {
	return createServer({
		environment,

		models: {
			article: Model
		},

		factories: {
			article: articleFactory
		},

		seeds(server) {
			server.createList('article', 35);
		},

		routes() {
			this.namespace = 'api';

			// Get articles with pagination, filtering, and search
			this.get('/articles', (schema, request) => {
				const { page = '1', limit = '10', search = '', status = '' } = request.queryParams;

				const pageNum = parseInt(Array.isArray(page) ? page[0] : page || '1', 10);
				const limitNum = parseInt(Array.isArray(limit) ? limit[0] : limit || '10', 10);

				let filteredArticles = schema.all('article').models;

				if (search) {
					const searchLower = Array.isArray(search)
						? search[0].toLowerCase()
						: search.toLowerCase();
					filteredArticles = filteredArticles.filter((article) =>
						article.title.toLowerCase().includes(searchLower)
					);
				}

				if (status) {
					const statusValue = Array.isArray(status) ? status[0] : status;
					filteredArticles = filteredArticles.filter((article) => article.status === statusValue);
				}

				const start = (pageNum - 1) * limitNum;
				const end = start + limitNum;
				const paginatedArticles = filteredArticles.slice(start, end);

				return {
					articles: paginatedArticles,
					meta: {
						total: filteredArticles.length,
						page: pageNum,
						limit: limitNum,
						totalPages: Math.ceil(filteredArticles.length / limitNum)
					}
				};
			});

			this.get('/articles/:id', (schema, request) => {
				const id = request.params.id;
				const article = schema.find('article', id);

				if (!article) {
					return new Response(404, {}, { error: 'Article not found' });
				}

				return { article };
			});

			this.post('/articles', (schema, request) => {
				const attrs = JSON.parse(request.requestBody);
				attrs.createdAt = new Date().toISOString();

				schema.create('article', attrs);
				return { articles: attrs };
			});

			this.patch('/articles/:id', (schema, request) => {
				const id = request.params.id;
				const attrs = JSON.parse(request.requestBody);

				const article = schema.find('article', id);

				if (!article) {
					return new Response(404, {}, { error: 'Article not found' });
				}

				article.update(attrs);
				return { article };
			});

			this.delete('/articles/:id', (schema, request) => {
				const id = request.params.id;
				const article = schema.find('article', id);

				if (!article) {
					return new Response(404, {}, { error: 'Article not found' });
				}

				article.destroy();
				return new Response(204);
			});
		}
	});
}
