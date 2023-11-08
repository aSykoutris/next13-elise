"use server";

import { Impersonate } from "@/app/types/api/apiTypes";

export default async function getImpersonate({
  Email,
  HaveConsent,
  serverAccessToken,
}: Impersonate) {
  "use server";
  try {
    const res = await fetch(process.env.IMPERSONATE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serverAccessToken}`,
      },
      body: JSON.stringify({
        Email:Email,
        HaveConsent:HaveConsent
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
    console.error("Error in getImpersonate:", error);
    console.log("############################");
    return { error: `${error}` };
  }
}
