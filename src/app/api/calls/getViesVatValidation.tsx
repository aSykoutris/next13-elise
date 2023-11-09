'use server';

import {ViesVatValidation } from '@/app/types/api/apiTypes';

export default async function getViesVatValidation({
  Code,
  Vat,
  serverAccessToken,
}: ViesVatValidation) {
  'use server';
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_VIESVATVALIDATION_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverAccessToken}`,
      },
      body: JSON.stringify({
        Code: Code,
        Vat: Vat,
      }),
    });

    const data = await res.json();
    console.log("DATA==>", data)
    // Check if the response contains an "Errors" field to detect API-level errors
    if (data.Errors) {
      // Handle API-level errors here
      throw new Error('API error: ' + JSON.stringify(data.Errors));
    }

    return data;
  } catch (error) {
    console.log('############################');
    console.error('Error in getImpersonate:', error);
    console.log('############################');
    return { error: `${error}` };
  }
}
