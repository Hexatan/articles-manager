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
