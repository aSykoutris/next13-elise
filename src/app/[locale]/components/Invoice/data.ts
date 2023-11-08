import React from "react";

const ROWS_PER_PAGE = 20;

const columns = [
  { name: "table_col_seriesNumber", uid: "seriesCode", sortable: true },
  { name: "table_col_series", uid: "iaprType", sortable: true },
  { name: "table_col_dateIssued", uid: "dateIssued", sortable: true },
  { name: "table_col_status", uid: "docStatus", sortable: true },
  { name: "table_col_registeredName", uid: "counterPartyName" },
  { name: "table_col_totalValue", uid: "docTotal" },
  { name: "", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const searchOptions = [
  { name: "search_dropdown", uid: "Number" },
  { name: "search_dropdown_series", uid: "asd" },
  { name: "search_dropdown_tin", uid: "IssuerTin" },
  { name: "search_dropdown_type", uid: "Series" },
  { name: "search_dropdown_status", uid: "Status" },
  { name: "search_dropdown_tag", uid: "Tag" },
];

const dateOptions = [
  { name: "filter_date_today", uid: 0 },
  { name: "filter_date_yesterday", uid: 1 },
  { name: "filter_date_prev7", uid: 2 },
  { name: "filter_date_prev30", uid: 3 },
  { name: "filter_date_curMonth", uid: 4 },
  { name: "filter_date_prevMonth", uid: 5 },
  { name: "filter_date_curYear", uid: 6 },
  { name: "filter_date_anytime", uid: 7 },
  { name: "filter_date_range", uid: 8 },
];
const users = [
  {
    id: 0,
    ContinuationToken: "1",
    Page: 0,
    Series: "1.1",
    Number: "8ΕΕ-801014447848",
    IssuerTin: "EL123456789",
    CounterPartyTin: "string",
    IAPRType: "string",
    Status: "active",
    IsArchived: true,
    BranchCodes: [0],
    DateFrom: "2023-10-04T09:08:47.084Z",
    DateTo: "2023-10-04T09:08:47.084Z",
    IsPaid: true,
    IsViewed: true,
    Tags: ["string"],
  },
  {
    id: 1,
    ContinuationToken: "1",
    Page: 0,
    Series: "5.2",
    Number: "A-0670074",
    IssuerTin: "EL1246366789",
    CounterPartyTin: "string",
    IAPRType: "string",
    Status: "active",
    IsArchived: true,
    BranchCodes: [0],
    DateFrom: "2023-10-04T09:09:47.084Z",
    DateTo: "2023-10-04T09:05:47.084Z",
    IsPaid: true,
    IsViewed: true,
    Tags: ["string"],
  },
  {
    id: 2,
    ContinuationToken: "1",
    Page: 0,
    Series: "2.1",
    Number: "Ε-0017842",
    IssuerTin: "EL123256789",
    CounterPartyTin: "string",
    IAPRType: "string",
    Status: "paused",
    IsArchived: true,
    BranchCodes: [0],
    DateFrom: "2023-10-04T09:02:47.084Z",
    DateTo: "2023-10-04T09:01:47.084Z",
    IsPaid: true,
    IsViewed: true,
    Tags: ["string"],
  },
];

// Generate 20 more objects
for (let i = 0; i < 10; i++) {
  const newUser = {
    id: i + users.length,
    ContinuationToken: "1",
    Page: 0,
    Series: `${i + 1}.1`,
    Number: `NewNumber${i}`,
    IssuerTin: `NewIssuerTin${i}`,
    CounterPartyTin: "string",
    IAPRType: "string",
    Status: "active",
    IsArchived: true,
    BranchCodes: [0],
    DateFrom: "2023-10-02T09:05:47.084Z",
    DateTo: "2023-10-04T09:08:47.084Z",
    IsPaid: true,
    IsViewed: true,
    Tags: ["string"],
  };

  users.push(newUser);
}

export {
  columns,
  users,
  statusOptions,
  searchOptions,
  dateOptions,
  ROWS_PER_PAGE,
};
