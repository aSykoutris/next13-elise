'use client';

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { Image } from '@nextui-org/react';

type toolsProps = {
  translate: string;
  Form: any;
  locale: string;
  session:any;
};

export default function Tools({ translate, Form, locale, session }: toolsProps) {
  const t = useTranslations(`${translate}`);
  return (
    <section className='flex flex-col justify-center items-center'>
      <Image
        src='https://green-forest-030f1a603.2.azurestaticapps.net/img/illustrations/StandingMan.svg'
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt='clarinet'
        className=' self-center'
      />
      <section className='flex flex-col gap-3 justify-center items-center py-10'>
        <h1 className='font-bold text-5xl text-center'>{t('title')}</h1>
        <h5 className='text-center'>{t('subTitle')}</h5>
      </section>
      <Form session={session}/>
    </section>
  );
}
