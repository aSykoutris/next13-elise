import InvoiceTable from '@/app/[locale]/components/Invoice/InvoiceTable';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import useSWR from 'swr';
import getInvoices from '@/app/api/calls/getInvoices';
export default async function InvoiceOutgoingPage() {
  // console.log(data);

  const locale = useLocale();
  const session = await getServerSession(options);

  if (!session?.user) {
    console.log(
      'No active Server Session : + ',
      JSON.stringify(session, null, 2)
    );
    redirect(`/${locale}/signout?callbackUrl=/home`);
  }

  const data = await getInvoices({
    page: 1,
    serverAccessToken: session?.user?.serverAccessToken,
    issuerTin: session?.user?.companyVat,
  });

  console.log(data);
  return (
    <section className='container mx-auto flex flex-col min-h-[60vh] w-[95%]  gap-y-20  justify-center'>
      <InvoiceTable data={data} />
    </section>
  );
}
