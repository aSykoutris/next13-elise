'use client';

import {
  NavbarItem,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from '@nextui-org/react';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

import SignOutModal from '../Modals/SignOutModal';

export default function NavbarProfile() {
  const t = useTranslations('Navbar');
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const name = session?.user?.userName
    ?.split(' ')
    ?.map(word => {
      return word?.charAt(0);
    })
    ?.join('');

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={name || 'User'}
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          onAction={key => {
            if (key === t('profile_logout')) onOpen();
          }}
        >
          <DropdownItem key={t('profile')} textValue={t('profile')} className="h-14 gap-2">
            <p className="font-semibold">{t('profile_signedAs')}</p>
            <p className="font-semibold">{session?.user?.email}</p>
          </DropdownItem>
          <DropdownItem key={t('profile_selectCompany')} textValue={t('profile_selectCompany')}>
            <Link color="foreground" href="/selectCompany" as={NextLink} className="w-full">
              {t('profile_selectCompany')}
            </Link>
          </DropdownItem>
          <DropdownItem key={t('profile_myClaimsToDelete')} textValue={t('profile_myClaimsToDelete')}>
            <Link color="foreground" href="/" as={NextLink}>
              {t('profile_myClaimsToDelete')}
            </Link>
          </DropdownItem>
          <DropdownItem key={t('profile_logout')} textValue={t('profile_logout')} color={'danger'}>
            <span className="text-danger 400 ">{t('profile_logout')}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <SignOutModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
