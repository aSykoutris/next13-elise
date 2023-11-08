import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import Dashboard from '../../components/Home/Dashboard';

export default async function HomePage() {
  const locale = useLocale();
  const session = await getServerSession(options);

  if (!session?.user) {
    console.log(
      'No active Server Session : + ',
      JSON.stringify(session, null, 2)
    );
    redirect(`/${locale}/signout?callbackUrl=/dashboard`);
  }

  return <Dashboard />;
}
