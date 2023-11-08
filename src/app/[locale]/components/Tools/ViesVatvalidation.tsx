'use client';

import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useState, useRef, FormEvent } from 'react';

const countries = [
  {
    id: 'EL',
    value: 'EL',
    option: 'greece',
  },
  {
    id: 'BE',
    value: 'BE',
    option: 'belgium',
  },
  {
    id: 'BG',
    value: 'BG',
    option: 'bulgaria',
  },
  {
    id: 'XI',
    value: 'XI',
    option: 'northIreland',
  },
  {
    id: 'FR',
    value: 'FR',
    option: 'france',
  },
  {
    id: 'DE',
    value: 'DE',
    option: 'germany',
  },
  {
    id: 'DK',
    value: 'DK',
    option: 'denmark',
  },
  {
    id: 'EE',
    value: 'EE',
    option: 'estonia',
  },
  {
    id: 'IE',
    value: 'IE',
    option: 'ireland',
  },
  {
    id: 'ES',
    value: 'ES',
    option: 'spain',
  },
  {
    id: 'IT',
    value: 'IT',
    option: 'italy',
  },
  {
    id: 'NL',
    value: 'NL',
    option: 'netherlands',
  },
  {
    id: 'HR',
    value: 'HR',
    option: 'croatian',
  },
  {
    id: 'CY',
    value: 'CY',
    option: 'cyprus',
  },
  {
    id: 'LV',
    value: 'LV',
    option: 'latvia',
  },
  {
    id: 'LT',
    value: 'LT',
    option: 'lithuania',
  },
  {
    id: 'LU',
    value: 'LU',
    option: 'luxemburg',
  },
  {
    id: 'MT',
    value: 'MT',
    option: 'malta',
  },
  {
    id: 'HU',
    value: 'HU',
    option: 'hungary',
  },
  {
    id: 'PL',
    value: 'PL',
    option: 'poland',
  },
  {
    id: 'PT',
    value: 'PT',
    option: 'portugal',
  },
  {
    id: 'RO',
    value: 'RO',
    option: 'romania',
  },
  {
    id: 'SI',
    value: 'SI',
    option: 'slovenia',
  },
  {
    id: 'SK',
    value: 'SK',
    option: 'slovakia',
  },
  {
    id: 'SE',
    value: 'SE',
    option: 'sweden',
  },
  {
    id: 'CZ',
    value: 'CZ',
    option: 'czechRepublic',
  },
  {
    id: 'FI',
    value: 'FI',
    option: 'finland',
  },
];

export default function ViesVatvalidationForm({session}:any) {
  const t = useTranslations('ViesVatvalidation');
  const tin = useRef('');
  const rememberMe = useRef(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('i submitted the ViesVatvalidation Form');
  };

  return (
    <form className='space-y-6 w-full md:w-[50%]' onSubmit={handleSubmit}>
      <Select
        label={t('countries')}
        defaultSelectedKeys={['EL']}
        showScrollIndicators
        classNames={{
          label: 'text-black',
        }}
      >
        {countries.map((country) => (
          <SelectItem key={country.id} id={country.id} value={country.value}>
            {t(`${country.option}`)}
          </SelectItem>
        ))}
      </Select>
      <Input
        variant='bordered'
        color='primary'
        size='lg'
        disabled={loading}
        minLength={11}
        maxLength={11}
        label={t(`${'vatNumber'}`)}
        placeholder='EL123456789'
        type='text'
        onChange={(e) => {
          tin.current = e.target.value;
          setError('');
          if (tin.current !== '') setIsEnabled(true);
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
  );
}
