import decodeToken from '@/app/utils/decodeToken';
import { UserCompany } from '../types/api/apiTypes';
import { EncodedUser } from '../types/api/apiTypes';

export default function createUser(data: EncodedUser) {
  const tokenAttributes = decodeToken(data?.accessToken);

  if (!tokenAttributes) return null;

  const { userId, email, role, companyId, companyVat, serverAccessTokenExp } =
    tokenAttributes;

  const user: UserCompany = {
    userName: data?.userName,
    userId: userId,
    email: email,
    role: role,
    companyId: companyId,
    companyVat: companyVat,
    serverAccessToken: data?.accessToken,
    serverRefreshToken: data?.refreshToken,
    serverAccessTokenExp: serverAccessTokenExp,
  };

  return user;
}
