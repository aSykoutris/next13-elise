'use client';

import React, { FormEvent, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Spinner, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

import getSsoParams from '@/app/api/calls/getSsoParams';

export default function SignInForm() {
  const t = useTranslations('Sso');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const tin = useRef('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await getSsoParams(`${process.env.NEXT_PUBLIC_SSO_PARAMS}${tin.current}`);

    if (data?.error) {
      setLoading(false);
      setError(`${data?.error}`);
    }

    // console.log(`url: ${data?.url} , param: ${data?.redirectUrlParameter}`);
  };

  return (
    <Card
      shadow="md"
      disableRipple
      className="p-10"
      classNames={{
        header: 'justify-center flex-col gap-y-5',
        body: 'justify-center',
        footer: 'text-center justify-center text-sm font-medium gap-x-2',
      }}
    >
      <CardHeader>
        <h1 className="font-bold  text-4xl">{t('title')}</h1>
        <h2 className="text-lg">{t('subTitle')}</h2>
      </CardHeader>
      <CardBody>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            variant="bordered"
            color="primary"
            size="lg"
            disabled={loading}
            minLength={11}
            maxLength={11}
            placeholder="EL123456789"
            type="text"
            onChange={e => {
              tin.current = e.target.value;
              setError('');
              if (tin.current !== '') setIsEnabled(true);
              else setIsEnabled(false);
            }}
            classNames={{
              input: 'text-xl',
            }}
          />
          <span className="text-danger  text-sm mt-1 mx-2">{error}</span>
          <Button
            isLoading={loading ? true : false}
            type="submit"
            isDisabled={!isEnabled}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            spinnerPlacement="end"
          >
            {t('signInButton')}
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <span className="font-bold">{t('returnMessage')}</span>
        <Link href="/signin" className="text-primary hover:text-primary">
          {t('returnHome')}
        </Link>
      </CardFooter>
    </Card>
  );
}
