import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { PeriodToggle } from "@/components/period-toggle";
import { CATEGORY_LABEL, formatMoney, PERIOD_LABEL } from "@/lib/format";
import { balanceSheet, incomeStatement } from "@/lib/reports";
import { useAppStore } from "@/lib/store";
import type { LedgerState, PeriodKey } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

function ReportsPage() {
  const settings = useAppStore((s) => s.settings);
  const customers = useAppStore((s) => s.customers);
  const projects = useAppStore((s) => s.projects);
  const payments = useAppStore((s) => s.payments);
  const expenses = useAppStore((s) => s.expenses);
  const currency = settings.currency;
  const [period, setPeriod] = useState<PeriodKey>("year");
  const [tab, setTab] = useState<"income" | "balance">("income");

  const snapshot: LedgerState = useMemo(
    () => ({ settings, customers, projects, payments, expenses }),
    [settings, customers, projects, payments, expenses],
  );
  const income = useMemo(() => incomeStatement(snapshot, period), [snapshot, period]);
  const sheet = useMemo(() => balanceSheet(snapshot), [snapshot]);

  return (
    <div>
      <PageHeader
        title="التقارير"
        subtitle={`${settings.companyName} · ${PERIOD_LABEL[period]}`}
      />
      <div className="space-y-4 px-4 py-4">
        <PeriodToggle value={period} onChange={setPeriod} />

        <div className="grid grid-cols-2 rounded-lg bg-surface-2 p-1">
          <button
            type="button"
            onClick={() => setTab("income")}
            className={cn(
              "h-10 rounded-md text-sm font-medium",
              tab === "income" ? "bg-surface text-ink shadow-sm" : "text-muted",
            )}
          >
            قائمة الدخل
          </button>
          <button
            type="button"
            onClick={() => setTab("balance")}
            className={cn(
              "h-10 rounded-md text-sm font-medium",
              tab === "balance" ? "bg-surface text-ink shadow-sm" : "text-muted",
            )}
          >
            الميزانية
          </button>
        </div>

        {tab === "income" ? (
          <article className="rounded-xl bg-surface p-5 shadow-card">
            <header className="border-b border-line pb-3 text-center">
              <p className="text-xs tracking-wide text-muted">
                قائمة الدخل والأرباح والخسائر
              </p>
              <h2 className="mt-1 text-lg font-semibold">{settings.companyName}</h2>
              <p className="text-xs text-muted">{PERIOD_LABEL[period]}</p>
            </header>

            <Line
              label="إيرادات المشاريع (قيمة العقود)"
              value={formatMoney(income.revenue, currency)}
            />
            <Line
              label="منها محصّل نقدًا"
              value={formatMoney(income.collected, currency)}
              muted
            />
            <div className="mt-3 border-t border-line pt-2">
              <p className="mb-1 text-xs font-medium text-muted">المصروفات</p>
              {income.byCategory.length === 0 ? (
                <Line label="لا توجد مصروفات" value={formatMoney(0, currency)} muted />
              ) : (
                income.byCategory.map((row) => (
                  <Line
                    key={row.category}
                    label={CATEGORY_LABEL[row.category]}
                    value={formatMoney(row.amount, currency)}
                  />
                ))
              )}
              {income.overhead > 0 ? (
                <Line
                  label="منها مصروفات عامة"
                  value={formatMoney(income.overhead, currency)}
                  muted
                />
              ) : null}
              <Line
                label="إجمالي المصروفات"
                value={formatMoney(income.expensesTotal, currency)}
                strong
              />
            </div>
            <div className="mt-3 rounded-lg bg-surface-2 px-3 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold">
                  {income.netProfit >= 0 ? "صافي الربح" : "صافي الخسارة"}
                </span>
                <span
                  className={
                    income.netProfit >= 0
                      ? "text-lg font-semibold tabular-nums text-gain"
                      : "text-lg font-semibold tabular-nums text-loss"
                  }
                >
                  {formatMoney(income.netProfit, currency)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              الإيراد هنا قيمة عقود المشاريع التي بدأت في الفترة. الربح النقدي الفعلي
              يظهر في الرئيسية من التحصيل ناقص الصرف.
            </p>
          </article>
        ) : (
          <article className="rounded-xl bg-surface p-5 shadow-card">
            <header className="border-b border-line pb-3 text-center">
              <p className="text-xs tracking-wide text-muted">
                الميزانية العامة — المركز المالي
              </p>
              <h2 className="mt-1 text-lg font-semibold">{settings.companyName}</h2>
              <p className="text-xs text-muted">في تاريخ اليوم</p>
            </header>

            <p className="mt-4 mb-1 text-xs font-medium text-muted">الأصول</p>
            <Line label="النقدية والصندوق" value={formatMoney(sheet.cash, currency)} />
            <Line
              label="ذمم العملاء (متبقي العقود)"
              value={formatMoney(sheet.receivables, currency)}
            />
            <Line
              label="إجمالي الأصول"
              value={formatMoney(sheet.totalAssets, currency)}
              strong
            />

            <p className="mt-4 mb-1 text-xs font-medium text-muted">حقوق الملكية</p>
            <Line label="رأس المال" value={formatMoney(sheet.capital, currency)} />
            <Line
              label={sheet.retained >= 0 ? "أرباح محتجزة" : "خسائر مرحلة"}
              value={formatMoney(sheet.retained, currency)}
            />
            <Line
              label="إجمالي حقوق الملكية"
              value={formatMoney(sheet.totalEquity, currency)}
              strong
            />

            <div className="mt-3 rounded-lg bg-surface-2 px-3 py-3">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">توازن الميزانية</span>
                <span
                  className={
                    sheet.balanced ? "font-medium text-gain" : "font-medium text-loss"
                  }
                >
                  {sheet.balanced ? "متوازنة" : "غير متوازنة"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              النقدية = رأس المال + التحصيل − المصروفات. الذمم = قيمة العقود − المحصّل.
            </p>
          </article>
        )}
      </div>
    </div>
  );
}

function Line({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={
        strong
          ? "mt-1 flex items-baseline justify-between gap-3 border-t border-line pt-2"
          : "flex items-baseline justify-between gap-3 py-1.5"
      }
    >
      <span className={muted ? "text-sm text-muted" : "text-sm"}>{label}</span>
      <span
        className={
          strong
            ? "text-sm font-semibold tabular-nums"
            : muted
              ? "text-sm tabular-nums text-muted"
              : "text-sm tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
