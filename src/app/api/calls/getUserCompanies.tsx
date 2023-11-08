'use server';
import { Company } from '@/app/types/api/apiTypes';

export default async function getUserCompanies(
  serverAccessToken: string
): Promise<Company[]> {
  'use server';
  try {
    const res = await fetch(process.env.USER_COMPANIES_URL!, {
      method: 'POST',
      cache:'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverAccessToken}`,
      },
    });

    if (!res.ok) {
      // Handle HTTP error responses here
      throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    if (!data) {
      // Handle empty response data here
      throw new Error('Empty response data');
    }

    // Check if the response contains an "Errors" field to detect API-level errors
    if (data.Errors) {
      // Handle API-level errors here
      throw new Error('API error: ' + JSON.stringify(data.Errors));
    }

    return data;
  } catch (error) {
    console.log('############################');
    console.error('Error in getUserCompanies:', error);
    console.log('############################');
    return [];
  }
}
