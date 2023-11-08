import ImpersonateForm from '@/app/[locale]/components/Tools/ImpersonateForm';
import Tools from '@/app/[locale]/components/Tools/Tools';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export default async function ImpersonatePage() {
  const locale = useLocale();
  const session = await getServerSession(options);

  if (!session?.user) {
    console.log(
      'No active Server Session : + ',
      JSON.stringify(session, null, 2)
    );
    redirect(`/${locale}/signout?callbackUrl=/home`);
  }
  return (
    <section className='container mx-auto flex flex-col min-h-[60vh] w-[95%]  gap-y-20  justify-center items-center'>
      <Tools translate='Impersonate' Form={ImpersonateForm} locale={locale} session={session}/>
    </section>
  );
}
