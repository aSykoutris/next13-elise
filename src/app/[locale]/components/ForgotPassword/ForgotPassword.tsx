'use client';

import React, { FormEvent, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Link from 'next/link';

import ReturnModal from '../Modals/ReturnModal';

export default function ForgotPassword() {
  const t = useTranslations('ForgotPassword');
  const email = useRef('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsVisible(true);
  };

  return (
    <>
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap">
              <Input
                isClearable
                id="email"
                label={'Email'}
                color="primary"
                name="email"
                type="email"
                autoComplete="email"
                size="md"
                variant="bordered"
                maxLength={40}
                onChange={e => {
                  email.current = e.target.value;
                  setError('');
                  if (email.current !== '') setIsEnabled(true);
                  else setIsEnabled(false);
                }}
                classNames={{
                  label: 'text-black',
                }}
              />
            </div>
            <span className="text-danger  text-sm mt-1 mx-2">{error}</span>
            <Button
              type="submit"
              isDisabled={!isEnabled}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('submitButton')}
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
      {isVisible ? (
        <ReturnModal
          description={`${t('modalBody_one')} ${email.current}. ${t('modalBody_two')}`}
          buttonMessage={t('returnHome')}
          href={'/signin'}
        />
      ) : null}
    </>
  );
}
