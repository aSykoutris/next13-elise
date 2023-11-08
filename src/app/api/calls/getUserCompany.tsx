'use server';
import createUser from '@/app/utils/createUser';
import { UserCompany } from '@/app/types/api/apiTypes';

type GetUserCompanyProps = {
  companyId: number;
  serverAccessToken: string;
};

export default async function getUserCompany({
  companyId,
  serverAccessToken,
}: GetUserCompanyProps): Promise<UserCompany | null> {
  'use server';
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_SELECT_COMPANY_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverAccessToken}`,
      },
      body: JSON.stringify({
        CompanyId: companyId,
        ExtendedLoginDuration: true,
      }),
    });

    let data = await res.json();

    if (!data) {
      // Handle empty response data here
      throw new Error('Empty response data');
    }

    // Check if the response contains an "Errors" field to detect API-level errors
    if (data.Errors) {
      // Handle API-level errors here
      throw new Error('API error: ' + JSON.stringify(data.Errors));
    }

    // data = createUser(data);
    const newData = createUser(data);

    if (!newData) throw new Error('Not valid Access Token');
    return newData;
  } catch (error) {
    console.log('############################');
    console.error('Error in getUserCompany:', error);
    console.log('############################');
    return null;
  }
}
