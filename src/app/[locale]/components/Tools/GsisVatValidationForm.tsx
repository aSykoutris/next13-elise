'use client';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { Button, Input, Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useState, useRef, FormEvent } from 'react';

export default function GsisVatValidationForm({session}:any) {
  const t = useTranslations('GsisVatValidation');
  const username = useRef('');
  const password = useRef('');
  const rTin = useRef('');
  const cTin = useRef('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isFormEmpty = () =>
    username.current === '' ||
    password.current === '' ||
    rTin.current === '' ||
    cTin.current === '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('i submitted the GsisVatValidation Form');
  };

  return (
    <>
      <Link
        isExternal
        href='https://www.aade.gr/epiheiriseis/forologikes-ypiresies/mitroo/anazitisi-basikon-stoiheion-mitrooy-epiheiriseon'
        className='py-5'
      >
        {t('external')}
      </Link>
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input
          variant='bordered'
          color='primary'
          size='lg'
          disabled={loading}
          minLength={50}
          maxLength={50}
          label={t(`${'username'}`)}
          type='text'
          onChange={(e) => {
            username.current = e.target.value;
            setError('');
            if (!isFormEmpty()) setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            input: 'text-xl pb-2',
            label: 'text-black',
          }}
        />
        <Input
          label={t('password')}
          color='primary'
          variant='bordered'
          size='lg'
          disabled={loading}
          maxLength={30}
          autoComplete='current-password'
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeIcon className='h-5 w-5 text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeOffIcon className='h-5 w-5 text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          onChange={(e) => {
            password.current = e.target.value;
            setError('');
            if (!isFormEmpty()) setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            label: 'text-black',
          }}
        />
        <Input
          variant='bordered'
          color='primary'
          size='lg'
          disabled={loading}
          minLength={11}
          maxLength={11}
          label={t(`${'requesterVat'}`)}
          placeholder='EL123456789'
          type='text'
          onChange={(e) => {
            rTin.current = e.target.value;
            setError('');
            if (!isFormEmpty()) setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            input: 'text-xl',
            label: 'text-black',
          }}
        />
        <Input
          variant='bordered'
          color='primary'
          size='lg'
          disabled={loading}
          minLength={11}
          maxLength={11}
          label={t(`${'customerVat'}`)}
          placeholder='EL123456789'
          type='text'
          onChange={(e) => {
            cTin.current = e.target.value;
            setError('');
            if (!isFormEmpty()) setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            input: 'text-xl',
            label: 'text-black',
          }}
        />
        <span className='text-danger  text-sm mt-1 mx-2'>{error}</span>
        <Button
          isLoading={loading ? true : false}
          type='submit'
          isDisabled={!isEnabled}
          className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          spinnerPlacement='end'
        >
          {t('button')}
        </Button>
      </form>
    </>
  );
}
