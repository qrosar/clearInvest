import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next internals
  // - static files (anything with a file extension)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
