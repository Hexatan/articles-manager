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

While in production and in a real product, we should aim to use SvelteKit's load and form actions for data fetching and mutations.
With the restriction of MirageJS only being available in the browser, the decision was made to do the loading in the page component directly.

This approach was necessary because:

1. MirageJS is a client-side API mocking library that only works in the browser environment
2. SvelteKit's load functions in `+page.server.ts` and form actions run on the server
3. To intercept API requests with MirageJS, the requests need to be made from the browser

In a production environment without these restrictions, the recommended approach would be to:

- Use `+page.ts` or `+page.server.ts` with the `load` function for data fetching
- Use form actions in `+page.server.ts` for data mutations

### Role-Based Access Control

The application implements a role-based access control (RBAC) system to manage user permissions and access to different parts of the application.

#### Authentication Implementation

The authentication system is implemented in `src/lib/auth/auth.svelte.ts` using Svelte 5's Runes for reactive state management:

- `currentUser`: A reactive state object that stores the currently authenticated user
- `login(userType)`: Authenticates a user and stores their role in localStorage for persistence
- `logout()`: Clears the authentication state
- `initAuth()`: Initializes the authentication state from localStorage on application startup

For demonstration, the application uses mock users with predefined roles. In a production environment, this would be replaced with a real authentication system that verifies credentials against a backend service.

#### Authorization Mechanisms

Access control is enforced at multiple levels:

1. **Route-Level Protection**: The admin section is protected by checking the user's role in the `+layout.ts` file:

   ```typescript
   if (!currentUser.user || !hasRole('admin')) {
   	throw error(403, { message: 'Access Denied' });
   }
   ```

2. **Component-Level Protection**: The `hasRole(role)` function can be used to conditionally render UI elements based on the user's role:

   ```typescript
   export function hasRole(role: UserRole): boolean {
   	return !!currentUser.user?.roles.includes(role);
   }
   ```

#### UI Components for Role Management

The application includes a `RoleSwitcher` component that allows users to switch between different roles for testing and demonstration purposes. This component:

- Displays buttons for logging in as different user types (Admin, Editor, Viewer)
- Shows the current user's name and roles
- Provides a logout button

#### Security Considerations

While the current implementation is suitable for demonstration, a production implementation would need to address:

1. **Server-Side Validation**: All authorization checks should be duplicated on the server side
2. **Token-Based Authentication**: Use JWT or similar tokens with proper expiration and refresh mechanisms
3. **API Protection**: Ensure all API endpoints validate permissions before processing requests
4. **CSRF Protection**: Implement Cross-Site Request Forgery protection
5. **Audit Logging**: Log all authentication and authorization events for security monitoring

### Mirage Configuration for E2E Testing

The application uses different seed data for Mirage when running in Cypress E2E tests versus development mode:

1. **Development Mode**: Creates 145 random articles using Faker.js
2. **E2E Test Mode**: Creates a smaller set of articles

This configuration ensures that E2E tests have a consistent, predictable dataset to work with, making tests more reliable and easier to write.

The environment detection is automatic:

- When running in Cypress, the application detects `window.Cypress` and uses the 'test' environment
- In normal development, it uses the 'development' environment
