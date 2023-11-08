import { NextMiddleware, NextResponse } from 'next/server';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware {
  // Get the current middleware function from the 'functions' array based on the 'index'.
  const current = functions[index];

  if (current) {
    // Recursively call 'chain' to get the next middleware in the chain.
    const next = chain(functions, index + 1);
    // Call the current middleware function with the 'next' middleware as an argument.
    return current(next);
  }

  // If there are no more middleware functions to chain, return a middleware function that calls 'NextResponse.next()'.
  return () => NextResponse.next();
}
