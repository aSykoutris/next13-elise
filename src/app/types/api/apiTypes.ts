export type EncodedUser = {
  userName: string;
  accessToken: string;
  companyVat: string;
  refreshToken: string;
  requiresMFA?: boolean;
  extendedLoginDuration?: boolean;
};

export type SsOParams = {
  url?: number;
  redirectUrlParameter?: string;
  error?: string;
};

export type Company = {
  companyId: number;
  name: string;
  vat: string;
  error?: string;
};

export type UserCompany = {
  userName: string;
  userId: string;
  email: string;
  role: string;
  companyId: string;
  companyVat: string;
  serverAccessToken: string;
  serverRefreshToken: string;
  serverAccessTokenExp: string;
};

export type CompanyInvoices = {
  serverAccessToken: string;
  continuationToken?: string | null;
  page: number;
  series?: string | null;
  number?: string | null;
  issuerTin: string;
  counterPartyTin?: string | null;
  iarpType?: string | null;
  status?: string | null;
  isArchived?: boolean | null;
  branchCodes?: number[];
  dateFrom?: string;
  dateTo?: string;
  isPaid?: boolean | null;
  isViewed?: boolean | null;
  tags?: [string] | null;
};

export type Impersonate={
  Email:string;
  HaveConsent:boolean;
  serverAccessToken: string;
}

export type ViesVatValidation={
  Code:string;
  Vat:string;
  serverAccessToken: string;
}

export type GsisVatValidation={
  UserName:string;
  Password:string;
  CalledBy:string;
  CalledFor:string;
  serverAccessToken: string;
}