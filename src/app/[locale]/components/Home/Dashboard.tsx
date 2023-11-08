'use client';

import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import getInvoiceCount from '@/app/api/calls/getInvoiceCount';
import DashboardCard from './DashboardCard';

import ReturnModal from '../Modals/ReturnModal';
import { useRouter } from 'next/navigation';
// check
export default function Dashboard() {
  const [outboxCount, setOutboxCount] = useState(0);
  const [inboxCount, setInboxCount] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('Dashboard');

  async function getDashboardCounts() {
    const session = await getSession();
    if (!session) return;

    const serverAccessToken = session?.user?.serverAccessToken;
    const outbox = await getInvoiceCount({
      serverAccessToken,
      URL: process.env.NEXT_PUBLIC_OUTBOX_URL!,
    });
    const inbox = await getInvoiceCount({
      serverAccessToken,
      URL: process.env.NEXT_PUBLIC_INBOX_URL!,
    });
    if (outbox === -1 || inbox === -1) {
      setError('no invoices for this company');
      return;
    }
    setOutboxCount(outbox);
    setInboxCount(inbox);
    return session;
  }

  getDashboardCounts();

  return (
    <section className='container mx-auto px-6 flex flex-col min-h-[60vh] w-[95%] sm:w-full gap-y-20  justify-center'>
      <section className='flex flex-col gap-3'>
        <h1 className='font-bold text-2xl'>{t('title')}</h1>
        <h2 className='text-xl'>{t('subTitle')}</h2>
      </section>

      <section className='flex  flex-col sm:flex-row gap-y-5  gap-x-32 justify-between'>
        <DashboardCard
          title={t('card_title')}
          count={outboxCount | 0}
          footer={t('card_footer_outbox')}
          daysCount={t('card_daysCount')}
          handleClick={() => router.replace('/invoice/outgoing')}
        />
        <DashboardCard
          title={t('card_title')}
          count={inboxCount | 0}
          footer={t('card_footer_inbox')}
          daysCount={t('card_daysCount')}
          handleClick={() => router.replace('/invoice/incoming')}
        />
      </section>
      {error ? (
        <ReturnModal
          title={t('errorTitle')}
          description={t('error')}
          buttonMessage={t('returnButton')}
        />
      ) : null}
    </section>
  );
}
