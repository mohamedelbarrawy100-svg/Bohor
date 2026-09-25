import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  Plus,
  Settings2,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CashflowChart } from "@/components/cashflow-chart";
import { ExpenseSheet, PaymentSheet, ProjectSheet } from "@/components/forms";
import { PeriodToggle } from "@/components/period-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney, inPeriod, STATUS_LABEL } from "@/lib/format";
import { monthlySeries, projectTotals } from "@/lib/reports";
import { useAppStore } from "@/lib/store";
import type { PeriodKey } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const settings = useAppStore((s) => s.settings);
  const projects = useAppStore((s) => s.projects);
  const payments = useAppStore((s) => s.payments);
  const expenses = useAppStore((s) => s.expenses);
  const customers = useAppStore((s) => s.customers);
  const [period, setPeriod] = useState<PeriodKey>("year");
  const [payOpen, setPayOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const currency = settings.currency;

  const stats = useMemo(() => {
    const collected = payments
      .filter((p) => inPeriod(p.date, period))
      .reduce((s, p) => s + p.amount, 0);
    const spent = expenses
      .filter((e) => inPeriod(e.date, period))
      .reduce((s, e) => s + e.amount, 0);
    const cash =
      settings.openingCapital +
      payments.reduce((s, p) => s + p.amount, 0) -
      expenses.reduce((s, e) => s + e.amount, 0);
    const due = projects.reduce(
      (sum, p) => sum + projectTotals(p, payments, expenses).remaining,
      0,
    );
    return { collected, spent, profit: collected - spent, cash, due };
  }, [payments, expenses, projects, period, settings.openingCapital]);

  const series = useMemo(() => monthlySeries(payments, expenses, 6), [payments, expenses]);

  const recent = useMemo(() => {
    const pays = payments.map((p) => ({
      id: p.id,
      kind: "in" as const,
      title: projects.find((x) => x.id === p.projectId)?.name ?? "دفعة",
      amount: p.amount,
      date: p.date,
    }));
    const exps = expenses.map((e) => ({
      id: e.id,
      kind: "out" as const,
      title: e.vendor || "مصروف",
      amount: e.amount,
      date: e.date,
    }));
    return [...pays, ...exps]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [payments, expenses, projects]);

  const activeProjects = projects.filter((p) => p.status === "in_progress").slice(0, 3);

  return (
    <div>
      <PageHeader
        title={settings.companyName}
        subtitle="دفتر المقاول — حسابات التشطيبات"
        action={
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings" aria-label="الإعدادات">
              <Settings2 className="size-5" />
            </Link>
          </Button>
        }
      />

      <div className="space-y-5 px-4 py-4">
        <PeriodToggle value={period} onChange={setPeriod} />

        <section className="grid grid-cols-2 gap-3">
          <Kpi label="التحصيل" value={formatMoney(stats.collected, currency)} tone="gain" />
          <Kpi label="المصروفات" value={formatMoney(stats.spent, currency)} tone="loss" />
          <Kpi
            label={stats.profit >= 0 ? "صافي الربح" : "صافي الخسارة"}
            value={formatMoney(stats.profit, currency)}
            tone={stats.profit >= 0 ? "gain" : "loss"}
          />
          <Kpi
            label="مستحق من العملاء"
            value={formatMoney(stats.due, currency)}
            tone="warn"
          />
        </section>

        <section className="rounded-xl bg-surface p-4 shadow-card">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">حركة الصندوق</h2>
            <p className="text-xs text-muted">
              الرصيد:{" "}
              <span className="tabular-nums text-ink">
                {formatMoney(stats.cash, currency)}
              </span>
            </p>
          </div>
          <CashflowChart data={series} />
          <div className="mt-2 flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-primary" /> تحصيل
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-subtle" /> صرف
            </span>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2">
          <Button className="h-12" onClick={() => setPayOpen(true)}>
            <Plus className="size-4" /> دفعة
          </Button>
          <Button variant="outline" className="h-12" onClick={() => setExpOpen(true)}>
            <Plus className="size-4" /> مصروف
          </Button>
          <Button variant="secondary" className="h-12" onClick={() => setProjOpen(true)}>
            <Plus className="size-4" /> مشروع
          </Button>
        </section>

        <section className="flex gap-2">
          <Link
            to="/customers"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface text-sm font-medium shadow-card"
          >
            <Users className="size-4" /> العملاء ({customers.length})
          </Link>
          <Link
            to="/reports"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface text-sm font-medium shadow-card"
          >
            <Landmark className="size-4" /> المركز المالي
          </Link>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">مشاريع جارية</h2>
            <Link to="/projects" className="text-xs text-muted">
              الكل
            </Link>
          </div>
          <div className="space-y-2">
            {activeProjects.length === 0 ? (
              <p className="rounded-xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-card">
                لا توجد مشاريع قيد التنفيذ
              </p>
            ) : (
              activeProjects.map((p) => {
                const t = projectTotals(p, payments, expenses);
                return (
                  <Link
                    key={p.id}
                    to="/projects/$projectId"
                    params={{ projectId: p.id }}
                    className="block rounded-xl bg-surface p-4 shadow-card"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{p.location}</p>
                      </div>
                      <Badge tone="primary">{STATUS_LABEL[p.status]}</Badge>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${t.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-muted">
                      <span className="tabular-nums">
                        محصل {formatMoney(t.collected, currency)}
                      </span>
                      <span className="tabular-nums">
                        متبقي {formatMoney(t.remaining, currency)}
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold">آخر الحركات</h2>
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            {recent.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted">لا توجد حركات بعد</p>
            ) : (
              recent.map((row, i) => (
                <div
                  key={row.id}
                  className={
                    i
                      ? "flex items-center gap-3 border-t border-line px-4 py-3"
                      : "flex items-center gap-3 px-4 py-3"
                  }
                >
                  <span
                    className={
                      row.kind === "in"
                        ? "flex size-9 items-center justify-center rounded-md bg-gain-soft text-gain"
                        : "flex size-9 items-center justify-center rounded-md bg-loss-soft text-loss"
                    }
                  >
                    {row.kind === "in" ? (
                      <ArrowDownLeft className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{row.title}</p>
                    <p className="text-xs text-muted">{formatDate(row.date)}</p>
                  </div>
                  <p
                    className={
                      row.kind === "in"
                        ? "tabular-nums text-sm font-medium text-gain"
                        : "tabular-nums text-sm font-medium text-loss"
                    }
                  >
                    {row.kind === "in" ? "+" : "−"}
                    {formatMoney(row.amount, currency)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <PaymentSheet open={payOpen} onOpenChange={setPayOpen} />
      <ExpenseSheet open={expOpen} onOpenChange={setExpOpen} />
      <ProjectSheet open={projOpen} onOpenChange={setProjOpen} />
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "gain" | "loss" | "warn";
}) {
  const color =
    tone === "gain" ? "text-gain" : tone === "loss" ? "text-loss" : "text-warn";
  return (
    <div className="rounded-xl bg-surface p-3.5 shadow-card">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-base font-semibold tabular-nums tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}
