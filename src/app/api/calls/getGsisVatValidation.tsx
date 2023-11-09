'use server';

import {GsisVatValidation} from '@/app/types/api/apiTypes';

export default async function getGsisVatValidation({
  UserName,
  Password,
  CalledBy,
  CalledFor,
  serverAccessToken,
}: GsisVatValidation) {
  'use server';
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GSISVATVALIDATION_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverAccessToken}`,
      },
      body: JSON.stringify({
        UserName: UserName,
        Password: Password,
        CalledBy:CalledBy,
        CalledFor: CalledFor,
      }),
    });

    const data = await res.json();
    // Check if the response contains an "Errors" field to detect API-level errors
    if (data.Errors) {
      // Handle API-level errors here
      throw new Error('API error: ' + JSON.stringify(data.Errors));
    }

    return data;
  } catch (error) {
    console.log('############################');
    console.error('Error in getGsisVatValidation:', error);
    console.log('############################');
    return { error: `${error}` };
  }
}
