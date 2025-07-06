# Article Manager

This is a SvelteKit application for managing articles.

## Build/Configuration Instructions

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the SvelteKit development server with hot module replacement.

### Building for Production

To build the application for production:

```bash
npm run build
```

The build output will be in the `.svelte-kit/output` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Testing

### Unit Testing

To run unit tests:

```bash
npm run test
```

To run unit tests in watch mode:

```bash
npm run test:unit
```

### End-to-End Testing with Cypress

To run Cypress tests, you need to ensure that the development server is running on port 5174 (which is configured in the `cypress.config.ts` file as the baseUrl).

#### Running the Development Server and Cypress Together

The easiest way to run Cypress tests is to use the following command, which will start the development server and open the Cypress test runner in a single step:

```bash
npm run cy:dev
```

This command starts the development server on port 5174 and then opens the Cypress test runner.

#### Running Cypress Separately

If you prefer to run the development server and Cypress separately:

1. First, start the development server:
   ```bash
   npm run dev
   ```

2. Then, in a separate terminal, open the Cypress test runner:
   ```bash
   npm run cy:open
   ```

#### Running Cypress Tests in Headless Mode

To run Cypress tests in headless mode (useful for CI/CD pipelines):

```bash
npm run cy:run
```

Note: Make sure the development server is running before executing this command.

## Development Notes

### Data Loading Strategy

While in production and in a real product we should aim to use SvelteKit's load and form actions for data fetching and mutations, with the restriction of MirageJS only being available in the browser, the decision was made to do the loading in the page component directly.

This approach was necessary because:

1. MirageJS is a client-side API mocking library that only works in the browser environment
2. SvelteKit's load functions in `+page.server.ts` and form actions run on the server
3. To intercept API requests with MirageJS, the requests need to be made from the browser

In a production environment without these restrictions, the recommended approach would be to:

- Use `+page.ts` or `+page.server.ts` with the `load` function for data fetching
- Use form actions in `+page.server.ts` for data mutations
