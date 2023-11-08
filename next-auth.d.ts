// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

// * Extends next-auth types
declare module 'next-auth' {
  interface Session extends DefaultSession['user'] {
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
    };
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
