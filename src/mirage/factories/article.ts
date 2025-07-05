import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export const articleFactory = Factory.extend({
	title() {
		return faker.hacker.phrase();
	},

	author() {
		return faker.person.fullName();
	},

	status() {
		return faker.helpers.arrayElement(['Published', 'Draft', 'In review'] as const);
	},

	createdAt() {
		return faker.date.past({ years: 2 });
	}
});
