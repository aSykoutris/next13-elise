import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export function middlewareI18n(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const i18nMiddleware = createMiddleware({
      // A list of all locales that are supported
      locales: ['en', 'el', 'ro'],

      // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
      defaultLocale: 'el',
      localePrefix: 'always',
    });
    // console.log('first one');

    // Execute both i18nMiddleware and the next middleware concurrently
    const [i18nResult, nextMiddlewareResult] = await Promise.all([
      i18nMiddleware(request),
      middleware(request, event),
    ]);

    // For example, you can use i18nResult or nextMiddlewareResult
    // Return one of the results, or both if needed
    return i18nResult; // or return [i18nResult, nextMiddlewareResult];
  };
}
