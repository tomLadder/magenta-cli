// Authentication & Session
export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
  deviceId: string;
  username: string;
}

export interface LoginStatus {
  loggedIn: boolean;
  username?: string;
}

// Magenta API Login Response
export interface MagentaLoginResponse {
  token: {
    accessToken: string;
    accessExpiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
    recoveryToken: string | null;
  };
  validUsername: boolean;
  isValidUsername: boolean;
}

// Dashboard / Assets (Tariffs)
export interface Asset {
  id: string;
  name: string;
  label: string;
  customerNumber: string;
  category: 'FIXED_INTERNET' | 'MOBILE' | string;
  status: 'Active' | 'Inactive' | string;
}

export interface DashboardResponse {
  assets: Asset[];
  profileId: string;
  profileStatus: string;
  profileType: string;
}

// Profile
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  passwordExist: boolean;
  contactPhoneNo: string;
  contactEmailAddress: string;
  editableFields: string[];
}

// Invoices / Customer Bills
export interface BillAmount {
  units: string;
  amount: number;
}

export interface BillingAccount {
  id: string;
  name: string;
  isEBillActive: boolean;
}

export interface DownloadLink {
  name: string;
  url: string;
}

export interface CustomerBill {
  billId: string;
  billNo: string;
  billStatus: 'IN_PROCESS' | 'SETTLED' | 'OPEN' | string;
  billPeriod: string;
  billDate: string;
  amountDue: BillAmount;
  paymentDueDate: string;
  billingAccount: BillingAccount;
  stateDescription?: string;
  relatedPartyName: string;
  downloadLinks: DownloadLink[];
}

export interface CustomerBillsResponse {
  customerBills: CustomerBill[];
  billingAccountsToActivate: unknown[];
  showEbillActivation: boolean;
}

// Config
export interface Config {
  auth?: AuthSession;
  deviceId?: string;
  settings: {
    outputFormat: 'pretty' | 'json';
  };
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}
