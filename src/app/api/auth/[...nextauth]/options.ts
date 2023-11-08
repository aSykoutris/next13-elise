import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import refreshServerToken from '../../calls/refreshServerToken';
import decodeToken from '@/app/utils/decodeToken';
import createUser from '@/app/utils/createUser';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'email',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'password',
        },
        rememberMe: {
          label: 'Remember Me', // Label for the checkbox
          type: 'checkbox', // Type to indicate it's a checkbox input
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        try {
          const res = await fetch(process.env.LOGIN!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Email: credentials?.email,
              Password: credentials?.password,
              RememberMe: credentials?.rememberMe === 'true', //next-auth automatically makes my bool into string so I set it back here
            }),
          });

          if (!res?.ok) {
            console.log(res);
            throw new Error('wrongCredentials');
          }

          let data = await res.json();

          const newData = createUser(data);

          if (!newData) throw new Error('Not valid Access Token');

          data = newData;

          return data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log("jwt callback:", { token });
      if (trigger === 'update') {
        if (session?.newToken) {
          token.userName = session?.newToken?.userName;
          token.userId = session?.newToken?.userId;
          token.email = session?.newToken?.email;
          token.role = session?.newToken?.role;
          token.companyId = session?.newToken?.companyId;
          token.companyVat = session?.newToken?.companyVat;
          token.serverAccessToken = session?.newToken?.serverAccessToken;
          token.serverRefreshToken = session?.newToken?.serverRefreshToken;
          token.serverAccessTokenExp = session?.newToken?.serverAccessTokenExp;
        }
        return token;
      }

      if (user) {
        token.userName = user?.userName;
        token.userId = user?.userId;
        token.email = user?.email;
        token.role = user?.role;
        token.companyId = user?.companyId;
        token.companyVat = user?.companyVat;
        token.serverAccessToken = user?.serverAccessToken;
        token.serverRefreshToken = user?.serverRefreshToken;
        token.serverAccessTokenExp = user?.serverAccessTokenExp;
      }

      if (Date.now() < token.serverAccessTokenExp * 1000) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshServerToken({ token });
    },

    async session({ session, token, user }) {
      // console.log('session callback:', { token, user, session });

      if (session?.user) {
        session.user.userName = token.userName;
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.companyId = token.companyId;
        session.user.companyVat = token?.companyVat;
        session.user.serverAccessToken = token.serverAccessToken;
        session.user.serverRefreshToken = token.serverRefreshToken;
        session.user.serverAccessTokenExp = token.serverAccessTokenExp;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 40, // Set the maxAge to 40 minutes (in seconds)
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 40, // Set the maxAge to 40 minutes (in seconds)
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/signin',
  },
};
