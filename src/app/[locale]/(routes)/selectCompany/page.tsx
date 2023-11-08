import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { headers } from 'next/headers';

import { options } from '@/app/api/auth/[...nextauth]/options';
import getUserCompanies from '@/app/api/calls/getUserCompanies';
import SelectCompanyContent from '../../components/SelectCompany/SelectCompanyContent';

export default async function SelectCompanyPage() {
  const locale = useLocale();
  const session = await getServerSession(options);
  const headersList = headers();
  const referer = headersList.get('referer');

  if (!session?.user) {
    console.log(
      'No active Server Session : + ',
      JSON.stringify(session, null, 2)
    );
    redirect(`/${locale}/signout?callbackUrl=/selectCompany`);
  }

  // console.log('Home Page Server Session:', JSON.stringify(session, null, 2));
  const companies = await getUserCompanies(session?.user?.serverAccessToken);
  return (
    <SelectCompanyContent
      companies={companies}
      serverAccessToken={session?.user?.serverAccessToken}
    />
  );
}
