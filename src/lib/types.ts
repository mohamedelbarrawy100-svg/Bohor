export type CurrencyCode = "EGP" | "SAR" | "AED";

export type ProjectStatus = "planning" | "in_progress" | "completed" | "on_hold";

export type PaymentMethod = "cash" | "bank" | "cheque" | "wallet";

export type ExpenseCategory =
  | "materials"
  | "labor"
  | "transport"
  | "tools"
  | "rent"
  | "other";

export type PeriodKey = "month" | "year" | "all";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  createdAt: string;
};

export type Project = {
  id: string;
  customerId: string;
  name: string;
  location: string;
  contractAmount: number;
  startDate: string;
  status: ProjectStatus;
  notes: string;
  createdAt: string;
};

export type Payment = {
  id: string;
  projectId: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  notes: string;
};

export type Expense = {
  id: string;
  projectId: string | null;
  category: ExpenseCategory;
  amount: number;
  date: string;
  vendor: string;
  notes: string;
};

export type CompanySettings = {
  companyName: string;
  ownerName: string;
  phone: string;
  openingCapital: number;
  currency: CurrencyCode;
};

export type LedgerState = {
  settings: CompanySettings;
  customers: Customer[];
  projects: Project[];
  payments: Payment[];
  expenses: Expense[];
};
