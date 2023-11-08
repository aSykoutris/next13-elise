import { SortDescriptor, Selection } from '@nextui-org/react';

export type UserFilters = {
  page: number;
  isMassPrint: boolean;
  searchInput: string;
  dateFilter: string;
  selectedKeys: Selection;
  statusFilter: Selection;
  sortDescriptor: SortDescriptor;
  optionFilter: {
    name: string | undefined;
    uid: string | undefined;
  };
};
