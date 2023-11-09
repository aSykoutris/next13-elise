"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  User,
  ChipProps,
  Spinner,
  Tooltip,
} from "@nextui-org/react";

import { useState, useMemo, useCallback, Key, useEffect } from "react";
import { useTranslations } from "next-intl";

import { columns, searchOptions, ROWS_PER_PAGE } from "./data";

import TableFilter from "./TableFilter";
import { CompanyInvoices } from "@/app/types/api/apiTypes";
import { UserFilters } from "@/app/types/user/userTypes";
import { formatDate, getDateWithSubtraction } from "@/app/utils/date";
import { getSession, useSession } from "next-auth/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type structure = {
  header: string;
  tooltip?: string;
  isClickable: boolean;
};

const initialState: UserFilters = {
  searchInput: "",
  isMassPrint: false, // You can set it to false here
  selectedKeys: new Set([]),
  statusFilter: "all",
  page: 1,
  dateFilter: `${getDateWithSubtraction(29)} - ${getDateWithSubtraction(0)}`,
  optionFilter: {
    name: searchOptions?.at(0)?.name,
    uid: searchOptions?.at(0)?.uid,
  },
  sortDescriptor: {
    column: "type",
    direction: "ascending",
  },
};

const initialQuery: CompanyInvoices = {
  page: 1,
  serverAccessToken: "",
  issuerTin: "",
};

// const loadingState = isLoading || users.length === 0 ? 'loading' : 'idle';

export default function InvoiceTable({ data }: any) {
  const t = useTranslations("Invoice");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      initialQuery.serverAccessToken = session?.user?.serverAccessToken;
      initialQuery.issuerTin = session?.user?.companyVat;
    }
  }, [session?.user]);
  const [queryParams, setQueryParams] = useState(initialQuery);
  const [invoiceFilters, setInvoiceFilters] = useState(initialState);
  const users = data.documents;
  type User = (typeof users)[0];

  const updateQuery = useCallback(
    <K extends keyof CompanyInvoices>(
      fieldName: K,
      newValue: CompanyInvoices[K]
    ) => {
      setQueryParams({ ...queryParams, [fieldName]: newValue });
      // console.log(
      //   `You want to update query ${fieldName} with the value of ${newValue}.Current value is ${queryParams?.page}`
      // );
    },
    [queryParams]
  );

  // Function to update any field in the state dynamically
  const updateField = useCallback(
    <K extends keyof UserFilters>(fieldName: K, newValue: UserFilters[K]) => {
      setInvoiceFilters({ ...invoiceFilters, [fieldName]: newValue });
    },
    [invoiceFilters]
  );

  const items = useMemo(() => {
    const start = (invoiceFilters?.page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return users.slice(start, end);
  }, [invoiceFilters?.page, users]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[
        invoiceFilters?.sortDescriptor.column as keyof User
      ] as number;
      const second = b[
        invoiceFilters?.sortDescriptor.column as keyof User
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return invoiceFilters?.sortDescriptor.direction === "descending"
        ? -cmp
        : cmp;
    });
  }, [
    invoiceFilters?.sortDescriptor.column,
    invoiceFilters?.sortDescriptor.direction,
    items,
  ]);

  const renderCell = useCallback(
    (user: User, columnKey: Key) => {
      let cellValue = user[columnKey as keyof User];
      let structure: structure = {
        header: "",
        isClickable: false,
      };
      switch (columnKey) {
        case "seriesCode":
          structure.header = "table_col_seriesNumber";
          structure.isClickable = true;
          break;
        case "iaprType":
          structure.isClickable = true;
          structure.header = "table_col_series";
          break;
        case "dateIssued":
          structure.header = "table_col_dateIssued";
          const dateString = `${cellValue}`;
          const dateObject = new Date(dateString);
          const formatedDate = formatDate(dateObject);
          const timeString = dateString.slice(11, 16);
          cellValue = `${formatedDate} ${timeString}`;
          break;
        case "docStatus":
          return (
            <>
              <div className="flex justify-between sm:hidden">
                <div>{t("table_col_status")}</div>
                <Chip
                  className="sm:hidden"
                  color={statusColorMap[user.Status]}
                  size="sm"
                  variant="flat"
                >
                  {cellValue}
                </Chip>
              </div>
              <Chip
                className="hidden sm:flex"
                color={statusColorMap[user.Status]}
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            </>
          );
        case "counterPartyName":
          structure.tooltip = `${user.counterPartyTin}`;
          structure.isClickable = true;
          structure.header = "table_col_registeredName";
          break;
        case "docTotal":
          structure.header = "table_col_totalValue";
          break;
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Button size="sm" color="primary" className="w-full sm:w-[60%]">
                {t("table_cell_action")}
              </Button>
            </div>
          );

        default:
          cellValue;
      }

      return (
        <>
          <div className="flex justify-between sm:hidden">
            <div>{structure.header ? t(`${structure.header}`) : null}</div>
            <div className="relative flex justify-end text-end items-center gap-2">
              {cellValue}
            </div>
          </div>
          <Tooltip
            size={"sm"}
            placement={"top-start"}
            content={`${structure.tooltip}`}
            isDisabled={!Boolean(structure.tooltip)}
            delay={1500}
          >
            <div
              className={` ${
                structure.header === "table_col_totalValue" ? "justify-end" : ""
              } ${
                structure.isClickable
                  ? "cursor-pointer text-primary underline"
                  : ""
              } text-end items-center gap-2 hidden sm:flex`}
            >
              {cellValue}
            </div>
          </Tooltip>
        </>
      );
    },
    [t]
  );

  const topContent = useMemo(() => {
    return (
      <TableFilter
        queryParams={queryParams}
        invoiceFilters={invoiceFilters}
        updateField={updateField}
        updateQuery={updateQuery}
      />
    );
  }, [invoiceFilters, queryParams, updateField, updateQuery]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center gap-3">
        <Button
          isDisabled={false}
          variant="flat"
          onClick={() => {
            updateQuery("page", queryParams?.page + 1);
          }}
        >
          {/* {list.isLoading && <Spinner color="white" size="sm" />} */}
          {t("table_btn_loadMore")}
        </Button>
        <Button isDisabled={false} variant="flat">
          {/* {list.isLoading && <Spinner color="white" size="sm" />} */}
          {t("table_cell_lastPage")}
        </Button>
      </div>
    );
  }, [queryParams, t, updateQuery]);

  return (
    <>
      <section className="flex flex-col gap-3 mt-5 sm:mt-20">
        <h1 className="font-bold text-lg flex justify-center sm:justify-start sm:text-2xl">
          {t("outboxTitle")}
        </h1>
        <h2 className="text-base flex justify-center sm:justify-start sm:text-xl">
          {t("outboxSubTitle")}
        </h2>
      </section>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        fullWidth={true}
        isHeaderSticky
        removeWrapper
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[24rem]",
          thead: "hidden sm:table-header-group",
          tr: "flex flex-col items-end  p-10 border-y sm:table-row sm:items-start sm:border-none ",
          td: "border-b",
        }}
        selectedKeys={invoiceFilters?.selectedKeys}
        selectionMode={invoiceFilters?.isMassPrint ? "multiple" : "none"}
        sortDescriptor={invoiceFilters?.sortDescriptor}
        topContent={topContent}
        bottomContent={data?.lastPage ? null : bottomContent}
        topContentPlacement="outside"
        onSelectionChange={(k) => updateField("selectedKeys", k)}
        onSortChange={(k) => updateField("sortDescriptor", k)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="font-bold text-black"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
              isRowHeader
            >
              {column.name ? t(`${column.name}`) : ""}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No invoices found"}
          items={sortedItems}
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow key={item.oid}>
              {(columnKey) => (
                <TableCell className="w-full sm:w-fit">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
