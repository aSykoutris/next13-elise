'use client';

import React, { FormEvent, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import NextLink from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input, Spinner, Checkbox } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

export default function SignInForm() {
  const router = useRouter();
  const t = useTranslations('SignIn');
  const email = useRef('lmc@softone.gr'); //vpaschalidis@softone.gr
  const password = useRef('TeeBreak2023!'); //Vyronas123!@#
  const rememberMe = useRef(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: email.current,
        password: password.current,
        rememberMe: rememberMe.current,
        redirect: false,
        callbackUrl: window.location.search.includes('?callbackUrl=')
          ? `${new URLSearchParams(window.location.search).get('callbackUrl')}`
          : '/',
      });

      if (!res?.url) {
        setError(t('wrongCredentials'));
        throw new Error(t('wrongCredentials'));
      } else router?.replace(`${res?.url}`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{t('title')}</h1>
      </section>

      <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <Input
              isClearable
              id="email"
              label={t('emailLabel')}
              color="primary"
              name="email"
              disabled={loading}
              type="email"
              autoComplete="email"
              size="md"
              variant="bordered"
              maxLength={40}
              onChange={e => {
                email.current = e.target.value;
                setError('');
                if (email.current !== '' && password.current !== '') setIsEnabled(true);
                else setIsEnabled(false);
              }}
              classNames={{
                label: 'text-black',
              }}
            />
          </div>
          <Input
            label={t('passwordLabel')}
            color="primary"
            variant="bordered"
            size="md"
            disabled={loading}
            maxLength={30}
            autoComplete="current-password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeIcon className="h-5 w-5 text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            onChange={e => {
              password.current = e.target.value;
              setError('');
              if (email.current !== '' && password.current !== '') setIsEnabled(true);
              else setIsEnabled(false);
            }}
            classNames={{
              label: 'text-black',
            }}
          />
          <span className="text-danger text-sm mt-1 mx-2">{error}</span>
          <Checkbox className="p-0" onChange={e => (rememberMe.current = e.target.checked)}>
            {t('rememberMe')}
          </Checkbox>
          <Button
            isLoading={loading ? true : false}
            type="submit"
            // isDisabled={!isEnabled}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            spinnerPlacement="end"
          >
            {t('signInButton')}
          </Button>
          <Button
            as={NextLink}
            href="/sso"
            isDisabled={loading}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t('ssoButton')}
          </Button>
          <section>
            <span>{t('missingPassword')}</span>
            <Link href="/forgotPassword" className="text-primary hover:text-primary">
              {t('linkText')}
            </Link>
          </section>
          <section>
            <span>{t('oldInvoice')}</span>
            <Link
              href="https://einvoiceapp.softonecloud.com/Accounts/SignIn?ReturnUrl=%2f"
              className="text-primary hover:text-primary"
            >
              {t('linkText')}
            </Link>
          </section>
        </form>
      </section>
    </>
  );
}
