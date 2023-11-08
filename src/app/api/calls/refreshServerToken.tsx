'use server';

import { JWT } from 'next-auth/jwt';
import decodeToken from '@/app/utils/decodeToken';

export default async function refreshServerToken({ token }: { token: JWT }) {
  'use server';
  try {
    const res = await fetch(process.env.REFRESH_SERVER_TOKEN_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AccessToken: token?.serverAccessToken,
        RefreshToken: token?.serverRefreshToken,
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

    const decodedAccessToken = decodeToken(data?.accessToken);

    const newToken = {
      ...token,
      serverAccessToken: data?.accessToken,
      serverRefreshToken: data?.refreshToken,
      serverAccessTokenExp: decodedAccessToken?.serverAccessTokenExp,
    };

    data = newToken;
    return data;
  } catch (error) {
    console.log('############################');
    console.error('Error in refreshServerToken:', error);
    console.log('############################');
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
