'use server';
import { SsOParams } from '@/app/types/api/apiTypes';

export default async function getSsoParams(URL: string): Promise<SsOParams> {
  'use server';
  try {
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res?.ok) {
      const message = await res.json();
      throw new Error(`${message.errorMessage}`);
    }

    let data = await res.json(); //status 200 | 400

    const { url, redirectUrlParameter } = data;

    return { url, redirectUrlParameter };
  } catch (error) {
    console.log('############################');
    console.error('Error in getSsoParams:', error);
    console.log('############################');
    return { error: `${error}` };
  }
}
