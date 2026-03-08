// Authentication & Session
export interface AuthSession {
  sessionId: string;
  username: string;
  expiresAt?: number;
}

export interface LoginStatus {
  loggedIn: boolean;
  username?: string;
  customerId?: string;
}

// Customer Info
export interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

// Invoices
export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  total: {
    amount: number;
    currency: string;
  };
  status: 'PAID' | 'OPEN' | 'OVERDUE';
  downloadUrl?: string;
}

export interface InvoicesResponse {
  invoices: Invoice[];
  totalCount: number;
}

// Contracts
export interface Contract {
  contractId: string;
  contractType: string;
  productName: string;
  phoneNumber?: string;
  status: string;
  startDate: string;
  endDate?: string;
}

// Config
export interface Config {
  auth?: AuthSession;
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
