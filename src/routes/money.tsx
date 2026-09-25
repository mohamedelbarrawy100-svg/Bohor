import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ExpenseSheet, PaymentSheet } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_LABEL,
  formatDate,
  formatMoney,
  inPeriod,
  METHOD_LABEL,
} from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { PeriodKey } from "@/lib/types";
import { PeriodToggle } from "@/components/period-toggle";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/money")({ component: MoneyPage });

function MoneyPage() {
  const payments = useAppStore((s) => s.payments);
  const expenses = useAppStore((s) => s.expenses);
  const projects = useAppStore((s) => s.projects);
  const currency = useAppStore((s) => s.settings.currency);
  const deletePayment = useAppStore((s) => s.deletePayment);
  const deleteExpense = useAppStore((s) => s.deleteExpense);
  const [tab, setTab] = useState<"in" | "out">("in");
  const [period, setPeriod] = useState<PeriodKey>("year");
  const [payOpen, setPayOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  const inRows = useMemo(
    () =>
      payments
        .filter((p) => inPeriod(p.date, period))
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date)),
    [payments, period],
  );
  const outRows = useMemo(
    () =>
      expenses
        .filter((e) => inPeriod(e.date, period))
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, period],
  );

  const inTotal = inRows.reduce((s, p) => s + p.amount, 0);
  const outTotal = outRows.reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <PageHeader
        title="الخزينة"
        subtitle="التحصيل والمصروفات"
        action={
          <Button
            size="sm"
            onClick={() => (tab === "in" ? setPayOpen(true) : setExpOpen(true))}
          >
            <Plus className="size-4" /> {tab === "in" ? "دفعة" : "مصروف"}
          </Button>
        }
      />
      <div className="space-y-4 px-4 py-4">
        <PeriodToggle value={period} onChange={setPeriod} />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-surface p-3.5 shadow-card">
            <p className="text-xs text-muted">تحصيل الفترة</p>
            <p className="mt-1 text-base font-semibold tabular-nums text-gain">
              {formatMoney(inTotal, currency)}
            </p>
          </div>
          <div className="rounded-xl bg-surface p-3.5 shadow-card">
            <p className="text-xs text-muted">صرف الفترة</p>
            <p className="mt-1 text-base font-semibold tabular-nums text-loss">
              {formatMoney(outTotal, currency)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 rounded-lg bg-surface-2 p-1">
          <button
            type="button"
            onClick={() => setTab("in")}
            className={cn(
              "h-10 rounded-md text-sm font-medium",
              tab === "in" ? "bg-surface text-ink shadow-sm" : "text-muted",
            )}
          >
            الدفعات
          </button>
          <button
            type="button"
            onClick={() => setTab("out")}
            className={cn(
              "h-10 rounded-md text-sm font-medium",
              tab === "out" ? "bg-surface text-ink shadow-sm" : "text-muted",
            )}
          >
            المصروفات
          </button>
        </div>

        {tab === "in" ? (
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            {inRows.length === 0 ? (
              <Empty onAdd={() => setPayOpen(true)} label="لا توجد دفعات في هذه الفترة" />
            ) : (
              inRows.map((p, i) => {
                const project = projects.find((x) => x.id === p.projectId);
                return (
                  <div
                    key={p.id}
                    className={
                      i
                        ? "flex items-center gap-3 border-t border-line px-4 py-3"
                        : "flex items-center gap-3 px-4 py-3"
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{project?.name ?? "مشروع"}</p>
                      <p className="text-xs text-muted">
                        {formatDate(p.date)} · {METHOD_LABEL[p.method]}
                        {p.notes ? ` · ${p.notes}` : ""}
                      </p>
                    </div>
                    <p className="tabular-nums text-sm font-medium text-gain">
                      {formatMoney(p.amount, currency)}
                    </p>
                    <button
                      type="button"
                      className="size-10 text-subtle"
                      aria-label="حذف"
                      onClick={() => deletePayment(p.id)}
                    >
                      <Trash2 className="mx-auto size-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            {outRows.length === 0 ? (
              <Empty onAdd={() => setExpOpen(true)} label="لا توجد مصروفات في هذه الفترة" />
            ) : (
              outRows.map((e, i) => {
                const project = projects.find((x) => x.id === e.projectId);
                return (
                  <div
                    key={e.id}
                    className={
                      i
                        ? "flex items-center gap-3 border-t border-line px-4 py-3"
                        : "flex items-center gap-3 px-4 py-3"
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {e.vendor || CATEGORY_LABEL[e.category]}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {formatDate(e.date)} · {CATEGORY_LABEL[e.category]}
                        {project ? ` · ${project.name}` : " · عام"}
                      </p>
                    </div>
                    <p className="tabular-nums text-sm font-medium text-loss">
                      {formatMoney(e.amount, currency)}
                    </p>
                    <button
                      type="button"
                      className="size-10 text-subtle"
                      aria-label="حذف"
                      onClick={() => deleteExpense(e.id)}
                    >
                      <Trash2 className="mx-auto size-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <PaymentSheet open={payOpen} onOpenChange={setPayOpen} />
      <ExpenseSheet open={expOpen} onOpenChange={setExpOpen} />
    </div>
  );
}

function Empty({ onAdd, label }: { onAdd: () => void; label: string }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-sm text-muted">{label}</p>
      <Button className="mt-4" size="sm" onClick={onAdd}>
        إضافة
      </Button>
    </div>
  );
}
