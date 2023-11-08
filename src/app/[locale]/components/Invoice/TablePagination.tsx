import { Pagination, Button, Selection } from '@nextui-org/react';
import React, { Dispatch, SetStateAction, useCallback } from 'react';

type TablePaginationProps = {
  isMassPrint: boolean;
  selectedKeys: Selection;
  filteredItemsLength: any;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
};

export default function TablePagination({
  isMassPrint,
  selectedKeys,
  filteredItemsLength,
  page,
  setPage,
  pages,
}: TablePaginationProps) {
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages, setPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage]);

  return (
    <div className='py-2 px-2 flex justify-between items-center'>
      <span className='w-[30%] text-small text-default-400'>
        {isMassPrint
          ? selectedKeys === 'all'
            ? 'All invoices selected'
            : `${selectedKeys.size} of ${filteredItemsLength} selected`
          : null}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color='primary'
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className='hidden sm:flex w-[30%] justify-end gap-2'>
        <Button
          isDisabled={pages === 1}
          size='sm'
          variant='flat'
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={pages === 1}
          size='sm'
          variant='flat'
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
