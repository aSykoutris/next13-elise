import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export function middlewareNextAuth(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // await withAuth({});

    return middleware(request, event);
  };
}
