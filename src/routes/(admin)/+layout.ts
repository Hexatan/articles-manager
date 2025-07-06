// This file will eventually handle authentication and other admin-specific logic
// For now, it's a placeholder that ensures the admin layout is applied to all admin routes

// Export prerender and SSR settings to match the main layout
export const prerender = true;
export const ssr = false;

// This is where we would add authentication checks in the future
// For example:
// export const load = async ({ fetch, session }) => {
//   if (!session.user || !session.user.isAdmin) {
//     throw redirect(302, '/login');
//   }
//   return {};
// };
