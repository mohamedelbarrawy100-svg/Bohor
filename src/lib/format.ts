import type {
  CurrencyCode,
  ExpenseCategory,
  PaymentMethod,
  PeriodKey,
  ProjectStatus,
} from "./types";

export const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  EGP: "ج.م",
  SAR: "ر.س",
  AED: "د.إ",
};

const moneyFmt = new Intl.NumberFormat("ar-EG", {
  numberingSystem: "latn",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function formatMoney(amount: number, currency: CurrencyCode = "EGP"): string {
  const sign = amount < 0 ? "−" : "";
  return `${sign}${moneyFmt.format(Math.abs(Math.round(amount)))} ${CURRENCY_LABEL[currency]}`;
}

export function formatNumber(amount: number): string {
  const sign = amount < 0 ? "−" : "";
  return `${sign}${moneyFmt.format(Math.abs(Math.round(amount)))}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "تخطيط",
  in_progress: "جاري التنفيذ",
  completed: "مكتمل",
  on_hold: "متوقف",
};

export const METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "نقدي",
  bank: "تحويل بنكي",
  cheque: "شيك",
  wallet: "محفظة",
};

export const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  materials: "خامات ومواد",
  labor: "عمالة",
  transport: "نقل",
  tools: "عدد وأدوات",
  rent: "إيجار",
  other: "أخرى",
};

export const PERIOD_LABEL: Record<PeriodKey, string> = {
  month: "هذا الشهر",
  year: "هذه السنة",
  all: "كل الفترة",
};

export function inPeriod(isoDate: string, period: PeriodKey, now = new Date()): boolean {
  if (period === "all") return true;
  const parts = isoDate.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  if (!y || !m) return false;
  if (period === "year") return y === now.getFullYear();
  return y === now.getFullYear() && m === now.getMonth() + 1;
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const idx = Number(m) - 1;
  return `${months[idx] ?? m} ${y}`;
}
