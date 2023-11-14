'use server';

export default async function getIarpEmailValidation(
 vatNumber
: string, serverAccessToken: string) {
  'use server';
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_IARPEMAIL_URL+`/${vatNumber}`!, {
      method: 'POST',
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
    console.error('Error in getIarpEmailValidation:', error);
    console.log('############################');
    return { error: `${error}` };
  }
}
