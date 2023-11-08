'use server';

type getInvoiceCountProps = {
  serverAccessToken: string;
  URL: string;
};

export default async function getInvoiceCount({
  serverAccessToken,
  URL,
}: getInvoiceCountProps): Promise<number> {
  'use server';
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serverAccessToken}`,
      },
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
    console.error('Error in getInvoiceCount:', error);
    console.log('############################');
    return -1;
  }
}
