'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import CompanyCard from './CompanyCard';
import NoCompaniesModal from '../Modals/NoCompaniesModal';

import getUserCompany from '@/app/api/calls/getUserCompany';
import { Company } from '@/app/types/api/apiTypes';
import { useRouter } from 'next/navigation';

type HomeContentProps = {
  companies: Company[];
  serverAccessToken: string;
};

export default function HomeContent({
  companies,
  serverAccessToken,
}: HomeContentProps) {
  const t = useTranslations('Home');
  const router = useRouter();
  const { update } = useSession();

  async function updateSession() {
    const firstCompanyId = companies[0]?.companyId;
    const token = await getUserCompany({
      companyId: firstCompanyId,
      serverAccessToken,
    });
    await update({
      newToken: token,
    });
  }

  if (companies.length === 1) {
    updateSession();
    router?.replace('/dashboard');
  }

  return (
    <>
      {companies.length ? (
        <section className='container mx-auto flex flex-col w-[95%] justify-items-center items-center gap-10'>
          <section className='mt-20'>
            <h1 className='font-bold text-center text-2xl'>{t('title')}</h1>
            <h2 className='text-center'>{t('subTitle')}</h2>
          </section>

          <section className='container mx-auto px-auto place-content-stretch place-items-center sm:place-items-stretch grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4  auto-rows-auto'>
            {companies.map((company: Company) => (
              <CompanyCard
                key={company?.companyId}
                companyName={company?.name}
                companyVat={company?.vat}
                companyId={company?.companyId}
                serverAccessToken={serverAccessToken}
              />
            ))}
          </section>
        </section>
      ) : (
        <NoCompaniesModal
          error={t('error')}
          title={t('errorTitle')}
          buttonMessage={t('errorButton')}
        />
      )}
    </>
  );
}
