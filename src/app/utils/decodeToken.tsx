import jwt_decode from 'jwt-decode';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  companyId: string;
  companyVat: string;
  serverAccessTokenExp: string;
}

export default function decodeToken(
  serverAccessToken: string
): DecodedToken | null {
  if (!serverAccessToken) return null;

  const decodedAccessToken = jwt_decode(serverAccessToken);

  const decodedData = {
    userId: (decodedAccessToken as { [key: string]: string })['UserId'],
    email: (decodedAccessToken as { [key: string]: string })[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ],
    role: (decodedAccessToken as { [key: string]: string })[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ],
    companyId: (decodedAccessToken as { [key: string]: string })['CompanyId'],
    companyVat: (decodedAccessToken as { [key: string]: string })['CompanyVat'],
    serverAccessTokenExp: (decodedAccessToken as { [key: string]: string })[
      'exp'
    ],
  };
  return decodedData;
}
