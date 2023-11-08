'use client';

import { Card, Snippet, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import getUserCompany from '@/app/api/calls/getUserCompany';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

type CompanyCardsPros = {
  companyName: string;
  companyVat: string;
  companyId: number;
  serverAccessToken: string;
};

export default function CompanyCard({ companyName, companyVat, companyId, serverAccessToken }: CompanyCardsPros) {
  const t = useTranslations('CompanyCardComponent');
  const { update } = useSession();
  const router = useRouter();

  async function updateSession() {
    const token = await getUserCompany({ companyId, serverAccessToken });
    await update({
      newToken: token,
    });
  }

  return (
    <Card className="flex justify-between w-[95%] space-y-10 p-4 " radius="md">
      <Link
        className="text-primary-500 hover:text-primary-600 text-2xl"
        href="#"
        as={NextLink}
        onClick={async () => {
          await updateSession();
          router?.replace('/dashboard');
        }}
      >
        {companyName}
      </Link>
      <Snippet
        size="sm"
        symbol={`${t('vat')}:`}
        tooltipProps={{
          color: 'foreground',
          content: 'Copy this snippet',
          placement: 'top',
          closeDelay: 0,
        }}
        variant="bordered"
        color="default"
        classNames={{
          pre: 'text-lg font-medium',
          copyButton: 'hover:text-primary-500',
        }}
      >
        {companyVat}
      </Snippet>
    </Card>
  );
}
