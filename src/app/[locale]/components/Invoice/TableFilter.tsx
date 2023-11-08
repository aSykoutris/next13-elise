'use client';

import {
  SearchIcon,
  ChevronDownIcon,
  DownloadIcon,
  PrinterIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from '@heroicons/react/outline';

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Input,
} from '@nextui-org/react';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { searchOptions, statusOptions, dateOptions } from './data';
import { UserFilters } from '@/app/types/user/userTypes';
import { CompanyInvoices } from '@/app/types/api/apiTypes';
import {
  getCurDate,
  getDateWithSubtraction,
  getMonthDate,
} from '@/app/utils/date';

import { formatDate } from '@/app/utils/date';

type TableFilterProps = {
  queryParams: CompanyInvoices | undefined;
  invoiceFilters: UserFilters;
  updateField: <K extends keyof UserFilters>(
    fieldName: K,
    newValue: UserFilters[K]
  ) => void;
  updateQuery: <K extends keyof CompanyInvoices>(
    fieldName: K,
    newValue: CompanyInvoices[K]
  ) => void;
};

export default function TableFilter({
  queryParams,
  invoiceFilters,
  updateField,
  updateQuery,
}: TableFilterProps) {
  const t = useTranslations('Invoice');
  const [isFullText, setIsFullText] = useState(false);
  const [activeDateOption, setActiveDateOption] = useState(3);

  const dateButtonText = useCallback((uid: number): string => {
    const today = getCurDate();
    const currentYear = today.getFullYear();

    const curMonthFirstDate = getMonthDate(today, 0, 1);
    const curMonthLastDate = getMonthDate(today, 1, 0);
    const prevMonthFirstDate = getMonthDate(today, -1, 1);
    const prevMonthLastDate = getMonthDate(today, 0, 0);

    const curYearFirstDate = new Date(currentYear, 0, 1);
    const curYearLastDate = new Date(currentYear, 11, 31);

    switch (uid) {
      case 0:
        return `${getDateWithSubtraction()} - ${getDateWithSubtraction()}`;
      case 1:
        return `${getDateWithSubtraction(1)} - ${getDateWithSubtraction(1)}`;
      case 2:
        return `${getDateWithSubtraction(6)} - ${getDateWithSubtraction()}`;
      case 3:
        return `${getDateWithSubtraction(29)} - ${getDateWithSubtraction(0)}`;
      case 4:
        return `${formatDate(curMonthFirstDate)} - ${formatDate(
          curMonthLastDate
        )}`;
      case 5:
        return `${formatDate(prevMonthFirstDate)} - ${formatDate(
          prevMonthLastDate
        )}`;
      case 6:
        return `${formatDate(curYearFirstDate)} - ${formatDate(
          curYearLastDate
        )}`;
      case 7:
        return `01/01/2019 - ${getDateWithSubtraction(0)}`;
      default: {
        return `${getDateWithSubtraction(29)} - ${getDateWithSubtraction(0)}`;
      }
    }
  }, []);

  return (
    <section className='flex flex-col gap-4'>
      <section className='flex justify-end flex-col items-center sm:items-end gap-2  sm:flex-row  '>
        <Button
          startContent={<DownloadIcon className='text-small h-5 w-5' />}
          variant='flat'
          className='hover:bg-primary w-full sm:w-auto'
        >
          {t('filter_btn_excel')}
        </Button>
        <Button
          startContent={<PrinterIcon className='text-small h-5 w-5' />}
          variant='flat'
          className={`${
            invoiceFilters?.isMassPrint ? 'bg-primary' : ''
          } hover:bg-primary w-full sm:w-auto`}
          onClick={() =>
            updateField('isMassPrint', !invoiceFilters?.isMassPrint)
          }
        >
          {t('filter_btn_print')}
        </Button>
        <Button
          startContent={<BookOpenIcon className='text-small h-5 w-5' />}
          variant='flat'
          className={`${
            isFullText ? 'bg-primary' : ''
          } hover:bg-primary w-full sm:w-auto`}
          onClick={() => setIsFullText((prev: boolean) => !prev)}
        >
          {t('filter_btn_look')}
        </Button>
        <Button
          startContent={
            <QuestionMarkCircleIcon className='text-small h-5 w-5' />
          }
          variant='flat'
          className='hover:bg-secondary-100 bg-primary w-full sm:w-auto'
        >
          {t('filter_btn_help')}
        </Button>
      </section>
      <section className='flex justify-between gap-3 items-end flex-col sm:flex-row w-full'>
        <section className='flex flex-col gap-3 w-full sm:w-fit sm:flex-row '>
          <div className='flex gap-3 w-full sm:w-fit '>
            <Dropdown>
              <DropdownTrigger className='flex'>
                <Button
                  endContent={
                    <ChevronDownIcon className='text-small h-5 w-5' />
                  }
                  variant='flat'
                  className=' flex justify-between w-full sm:w-fit'
                >
                  {t(`${invoiceFilters?.optionFilter?.name}`)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect
                selectedKeys={invoiceFilters?.optionFilter?.name}
                selectionMode='single'
              >
                {searchOptions.map((filter, i) => (
                  <DropdownItem
                    key={i}
                    onClick={() => {
                      updateField('searchInput', '');
                      updateField('optionFilter', filter);
                    }}
                  >
                    {t(`${filter?.name}`)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='w-full sm:max-w-[100%]'>
            <Input
              isClearable
              className='w-full'
              placeholder={`${t('search_by')}  ${t(
                `${invoiceFilters?.optionFilter?.name}`
              )}...`}
              startContent={<SearchIcon className='h-5 w-5' />}
              onClear={() => {
                updateField('searchInput', '');
                // updateField('page', 1);
              }}
              onValueChange={(value) => {
                if (value) {
                  updateField('searchInput', value);
                  // updateField('page', 1);
                } else updateField('searchInput', '');
              }}
            />
          </div>
        </section>

        <section className='flex flex-col gap-4 w-full sm:w-fit sm:flex-row '>
          <div className='flex gap-3 w-full sm:w-fit'>
            <Dropdown>
              <DropdownTrigger className='flex'>
                <Button
                  startContent={<CalendarIcon className=' h-5 w-5' />}
                  endContent={<ChevronDownIcon className='h-5 w-5' />}
                  variant='flat'
                  className=' flex justify-between w-full sm:w-fit'
                >
                  {/* {t(`${dateOptions.at(activeDateOption)?.name}`)} */}{' '}
                  {invoiceFilters?.dateFilter}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect
                // selectedKeys={dateOptions}
                selectionMode='single'
              >
                {dateOptions.map((option, i) => (
                  <DropdownItem
                    key={i}
                    className={`${
                      option.uid === activeDateOption ? 'bg-primary' : 'null'
                    }`}
                    onClick={() => {
                      setActiveDateOption(option.uid);
                      const dateString = dateButtonText(option.uid);
                      updateField('dateFilter', dateString);
                    }}
                  >
                    {t(`${option?.name}`)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='flex w-full sm:max-w-3xl'>
            <Dropdown>
              <DropdownTrigger className='flex'>
                <Button
                  endContent={
                    <ChevronDownIcon className='text-small h-5 w-5' />
                  }
                  variant='flat'
                  className='flex justify-between w-full sm:w-fit'
                >
                  {t('filter_dropdown')}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={invoiceFilters?.statusFilter}
                selectionMode='multiple'
                onSelectionChange={(k) => updateField('statusFilter', k)}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>{status.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className='flex w-full sm:w-fit'>
            <Button color='primary' className='w-full sm:w-fit'>
              {t('filter_btn_search')}
            </Button>
          </div>
        </section>
      </section>
    </section>
  );
}
