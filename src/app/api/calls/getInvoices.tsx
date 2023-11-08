"use server";

import { CompanyInvoices } from "@/app/types/api/apiTypes";

export default async function getInvoices({
  serverAccessToken,
  continuationToken = null,
  page = 1,
  series = null,
  number = null,
  issuerTin,
  counterPartyTin = null,
  iarpType = null,
  status = null,
  isArchived = null,
  branchCodes = [],
  dateFrom,
  dateTo,
  isPaid = null,
  isViewed = null,
  tags = null,
}: CompanyInvoices) {
  "use server";
  try {
    const res = await fetch(process.env.INVOICE_OUTBOX_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serverAccessToken}`,
      },
      body: JSON.stringify({
        ContinuationToken: continuationToken,
        Page: page,
        Series: series,
        Number: number,
        IssuerTin: issuerTin,
        CounterPartyTin: counterPartyTin,
        IAPRType: iarpType,
        Status: status,
        IsArchived: isArchived,
        BranchCodes: branchCodes,
        DateFrom: "2021-10-05T06:53:41.333Z",
        DateTo: "2023-10-05T06:53:41.333Z",
        IsPaid: isPaid,
        IsViewed: isViewed,
        Tags: tags,
      }),
    });

    const data = await res.json();
    // Check if the response contains an "Errors" field to detect API-level errors
    if (data.Errors) {
      // Handle API-level errors here
      throw new Error("API error: " + JSON.stringify(data.Errors));
    }

    return data;
  } catch (error) {
    console.log("############################");
    console.error("Error in getInvoices:", error);
    console.log("############################");
    return { error: `${error}` };
  }
}
