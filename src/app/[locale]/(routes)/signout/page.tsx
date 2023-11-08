'use client';

import { signOut } from 'next-auth/react';

export default function SignOutPage() {
  signOut({ callbackUrl: 'http://localhost:3000/el/signin' });
  return <></>;
}
