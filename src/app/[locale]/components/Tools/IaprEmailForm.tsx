'use client';

import { Button, Checkbox, Input } from '@nextui-org/react';

import { useTranslations } from 'next-intl';
import { useState, useRef, FormEvent } from 'react';

export default function IaprEmailForm({session}:any) {
  const t = useTranslations('IaprEmail');
  const tin = useRef('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('i submitted the IaprEmail Form');
  };

  return (
    <form className='space-y-6 w-full' onSubmit={handleSubmit}>
      <Input
        isClearable
        id='vat'
        label={t('vatLabel')}
        color='primary'
        name='vat'
        disabled={loading}
        type='text'
        placeholder='EL123456789'
        size='md'
        variant='bordered'
        maxLength={40}
        onChange={(e) => {
          tin.current = e.target.value;
          setError('');
          if (tin.current !== '') setIsEnabled(true);
          else setIsEnabled(false);
        }}
        classNames={{
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
  );
}
