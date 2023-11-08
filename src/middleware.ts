import { chain } from '@/middlewares/chain';
import { middlewareI18n } from './middlewares/middlewareI18n';
import { middlewareNextAuth } from './middlewares/middlewareNextAuth';

const middlewares = [middlewareI18n, middlewareNextAuth];
export default chain(middlewares);

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],

  // middleware: [
  //   {      matcher:['/((?!api|_next|.*\\..*).*)'],
  //     handler: middlewareI18n,
  //   },
  //   {
  //     matcher: ['/about'],
  //     handler: middlewareNextAuth,
  //   },
  // ],
};
