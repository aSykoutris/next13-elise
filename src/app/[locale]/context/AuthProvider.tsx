'use client';

import { ReactNode } from 'react';
// import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  // session: Session | null;
  children: ReactNode;
};

export default function AuthProvider({ /*session,*/ children }: AuthProviderProps) {
  return (
    // <SessionProvider session={session} refetchOnWindowFocus={false}>
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}
