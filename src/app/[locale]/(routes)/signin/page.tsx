import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import SignInForm from '../../components/SignIn/SignInForm';

export default async function SignInPage() {
  const session = await getServerSession(options);

  if (session) {
    redirect('/home');
  }

  return (
    <section className='container mx-auto w-[50%] justify-center'>
      <SignInForm />
    </section>
  );
}
