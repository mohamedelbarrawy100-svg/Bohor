import { inPeriod } from "./format";
import type {
  Expense,
  ExpenseCategory,
  LedgerState,
  PeriodKey,
  Project,
} from "./types";

export type ProjectTotals = {
  collected: number;
  spent: number;
  remaining: number;
  expectedProfit: number;
  cashProfit: number;
  progress: number;
};

export function projectTotals(
  project: Project,
  payments: { projectId: string; amount: number }[],
  expenses: { projectId: string | null; amount: number }[],
): ProjectTotals {
  const collected = payments
    .filter((p) => p.projectId === project.id)
    .reduce((s, p) => s + p.amount, 0);
  const spent = expenses
    .filter((e) => e.projectId === project.id)
    .reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(project.contractAmount - collected, 0);
  const expectedProfit = project.contractAmount - spent;
  const cashProfit = collected - spent;
  const progress =
    project.contractAmount <= 0
      ? 0
      : Math.min(100, Math.round((collected / project.contractAmount) * 100));
  return { collected, spent, remaining, expectedProfit, cashProfit, progress };
}

export type IncomeStatement = {
  revenue: number;
  collected: number;
  expensesTotal: number;
  byCategory: { category: ExpenseCategory; amount: number }[];
  netProfit: number;
  overhead: number;
};

export function incomeStatement(state: LedgerState, period: PeriodKey): IncomeStatement {
  const revenue = state.projects
    .filter((p) => inPeriod(p.startDate, period))
    .reduce((s, p) => s + p.contractAmount, 0);
  const collected = state.payments
    .filter((p) => inPeriod(p.date, period))
    .reduce((s, p) => s + p.amount, 0);
  const periodExpenses = state.expenses.filter((e) => inPeriod(e.date, period));
  const expensesTotal = periodExpenses.reduce((s, e) => s + e.amount, 0);
  const cats: ExpenseCategory[] = [
    "materials",
    "labor",
    "transport",
    "tools",
    "rent",
    "other",
  ];
  const byCategory = cats
    .map((category) => ({
      category,
      amount: periodExpenses
        .filter((e) => e.category === category)
        .reduce((s, e) => s + e.amount, 0),
    }))
    .filter((row) => row.amount > 0);
  const overhead = periodExpenses
    .filter((e) => !e.projectId)
    .reduce((s, e) => s + e.amount, 0);
  return {
    revenue,
    collected,
    expensesTotal,
    byCategory,
    netProfit: revenue - expensesTotal,
    overhead,
  };
}

export type BalanceSheet = {
  cash: number;
  receivables: number;
  totalAssets: number;
  capital: number;
  retained: number;
  totalEquity: number;
  balanced: boolean;
};

export function balanceSheet(state: LedgerState): BalanceSheet {
  const collected = state.payments.reduce((s, p) => s + p.amount, 0);
  const spent = state.expenses.reduce((s, e) => s + e.amount, 0);
  const cash = state.settings.openingCapital + collected - spent;
  const contractTotal = state.projects.reduce((s, p) => s + p.contractAmount, 0);
  const receivables = Math.max(contractTotal - collected, 0);
  const totalAssets = cash + receivables;
  const capital = state.settings.openingCapital;
  const retained = contractTotal - spent;
  const totalEquity = capital + retained;
  return {
    cash,
    receivables,
    totalAssets,
    capital,
    retained,
    totalEquity,
    balanced: Math.abs(totalAssets - totalEquity) < 1,
  };
}

export function customerBalance(
  customerId: string,
  projects: Project[],
  payments: { projectId: string; amount: number }[],
): number {
  return projects
    .filter((p) => p.customerId === customerId)
    .reduce((sum, p) => {
      const collected = payments
        .filter((pay) => pay.projectId === p.id)
        .reduce((s, pay) => s + pay.amount, 0);
      return sum + Math.max(p.contractAmount - collected, 0);
    }, 0);
}

export type MonthPoint = { key: string; collected: number; spent: number };

export function monthlySeries(
  payments: { date: string; amount: number }[],
  expenses: Expense[],
  months = 6,
): MonthPoint[] {
  const now = new Date();
  const keys: string[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    keys.push(`${d.getFullYear()}-${m}`);
  }
  return keys.map((key) => ({
    key,
    collected: payments
      .filter((p) => p.date.startsWith(key))
      .reduce((s, p) => s + p.amount, 0),
    spent: expenses
      .filter((e) => e.date.startsWith(key))
      .reduce((s, e) => s + e.amount, 0),
  }));
}
