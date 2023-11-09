'use client';

import {
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@nextui-org/react';

import NextLink from 'next/link';
import { useTranslations } from 'next-intl';

import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';

type NavbarItem = {
  label: string;
  subLabel?: string;
  icon?: JSX.Element;
  href?: string;
  divider?: boolean;
  subItems?: NavbarItem[][];
};

const navbarItems: NavbarItem[] = [
  {
    label: 'home',
    icon: <HomeIcon className='h-5 w-5' />,
    href: '/home',
  },
  {
    label: 'invoices',
    icon: <DocumentTextIcon className='h-5 w-5' />,
    subItems: [
      [
        { label: 'invoices_inbox', href: '/', divider: true },
        { label: 'invoices_preInvoices', href: '/' },
        { label: 'invoices_transmissionError', href: '/', divider: true },
        { label: 'invoices_approvalFlow', href: '/' },
        { label: 'invoices_foodAndBeverages', href: '/' },
      ],
    ],
  },
  {
    label: 'billing',
    icon: <CreditCardIcon className='h-5 w-5' />,
    href: '/',
  },
  {
    label: 'tools',
    icon: <CogIcon className='h-5 w-5' />,
    subItems: [
      [
        { label: 'tools_impersonate', href: '/authentication/impersonate' },
        {
          label: 'tools_vatValidationVies',
          href: '/vatvalidation/viesvatvalidation',
        },
        {
          label: 'tools_vatValidationGsis',
          href: '/vatvalidation/gsisvatvalidation',
        },
        {
          label: 'tools_EmailValidationIapr',
          href: '/vatvalidation/iapremail',
        },
        { label: 'tools_IaprConverter', href: '/' },
        { label: 'tools_invoiceCustomization', href: '/', divider: true },
      ],
      [
        {
          label: 'tools_branchManagement',
          href: '/',
          subLabel: 'tools_management',
        },
        { label: 'tools_companyManagement', href: '/' },
        { label: 'tools_packagesExpiration', href: '/' },
        { label: 'tools_inactivePackages', href: '/' },
      ],
    ],
  },
  {
    label: 'help',
    icon: <QuestionMarkCircleIcon className='h-5 w-5' />,
    subItems: [
      [
        { label: 'help_frequentlyAskedQuestions', href: '/help/faqs' },
        {
          label: 'help_downloadManual',
          href: 'https://green-forest-030f1a603.2.azurestaticapps.net/UserManual.pdf',
        },
        {
          label: 'help_iaprDocumentation',
          href: 'https://www.aade.gr/sites/default/files/2022-09/myDATA%20API%20Documentation_v1.0.6_eng.pdf',
          divider: true,
        },
        {
          label: 'help_openApiDocumentation',
          href: 'https://s1elisenextapidemo.azurewebsites.net/documentation/index.html?url=/v1/specification.json',
        },
        { label: 'help_developerWiki', href: '/' },
      ],
    ],
  },
];

export default function NavbarItems({
  isMobile,
}: {
  isMobile: boolean;
}): JSX.Element {
  const t = useTranslations('Navbar');
  const router = useRouter();
  let Tag = isMobile ? NavbarMenuItem : NavbarContent;

  const renderDropdownItems = (items: NavbarItem[]) =>
    items.map((item) => (
      <DropdownItem
        key={item?.href} //TODO: Different href for each instanse to avoid error
        textValue={t(item?.label)}
        showDivider={item?.divider}
        onPress={() => item?.href}
      >
        {t(item?.label)}
      </DropdownItem>
    ));

  return (
    <Tag
      className={isMobile ? '' : 'hidden md:flex gap-8 text-xl'}
      justify='center'
    >
      {navbarItems.map((item) => (
        <NavbarItem key={item.label}>
          {item.subItems ? (
            <Dropdown
              className='min-w-[8em]'
              showArrow={true}
              disableAnimation={true}
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-primary text-lg'
                  startContent={item.icon ? item.icon : null}
                  radius='sm'
                  variant='light'
                >
                  {t(item.label)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant='faded'
                aria-label={`Dropdown menu for ${item.label}`}
                onAction={(key) => router.replace(`${key}`)}
              >
                {item.subItems &&
                  item?.subItems.map((subitemArr, index) => (
                    <DropdownSection
                      key={index}
                      title={
                        subitemArr[0]?.subLabel
                          ? t(subitemArr[0]?.subLabel)
                          : ''
                      }
                      showDivider={item.divider ? true : false}
                      classNames={{
                        heading: 'font-bold underline decoration-black text-sm',
                      }}
                    >
                      {renderDropdownItems(subitemArr)}
                    </DropdownSection>
                  ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              href={item.href}
              as={NextLink}
              disableRipple
              className='p-0 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:text-primary text-lg'
              startContent={item.icon ? item.icon : null}
              radius='sm'
              variant='light'
            >
              {t(item.label)}
            </Button>
          )}
        </NavbarItem>
      ))}
    </Tag>
  );
}
