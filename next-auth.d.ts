// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      userName: string;
      userId: string;
      email: string;
      role: string;
      companyId: string;
      companyVat: string;
      serverAccessToken: string;
      serverRefreshToken: string;
      serverAccessTokenExp: number;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    userName: string;
    userId: string;
    email: string;
    role: string;
    companyId: string;
    companyVat: string;
    serverAccessToken: string;
    serverRefreshToken: string;
    serverAccessTokenExp: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userName: string;
    userId: string;
    email: string;
    role: string;
    companyId: string;
    companyVat: string;
    serverAccessToken: string;
    serverRefreshToken: string;
    serverAccessTokenExp: number;
  }
}
