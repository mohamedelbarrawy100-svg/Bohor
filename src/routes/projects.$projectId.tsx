import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ExpenseSheet, PaymentSheet, ProjectSheet } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_LABEL,
  formatDate,
  formatMoney,
  METHOD_LABEL,
  STATUS_LABEL,
} from "@/lib/format";
import { projectTotals } from "@/lib/reports";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const projects = useAppStore((s) => s.projects);
  const customers = useAppStore((s) => s.customers);
  const allPayments = useAppStore((s) => s.payments);
  const allExpenses = useAppStore((s) => s.expenses);
  const currency = useAppStore((s) => s.settings.currency);
  const deleteProject = useAppStore((s) => s.deleteProject);
  const deletePayment = useAppStore((s) => s.deletePayment);
  const deleteExpense = useAppStore((s) => s.deleteExpense);

  const project = projects.find((p) => p.id === projectId);
  const customer = customers.find((c) => c.id === project?.customerId);
  const payments = useMemo(
    () => allPayments.filter((p) => p.projectId === projectId),
    [allPayments, projectId],
  );
  const expenses = useMemo(
    () => allExpenses.filter((e) => e.projectId === projectId),
    [allExpenses, projectId],
  );

  const [edit, setEdit] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  if (!project) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="font-medium">المشروع غير موجود</p>
        <Link to="/projects" className="mt-3 inline-block text-sm text-primary">
          العودة للمشاريع
        </Link>
      </div>
    );
  }

  const t = projectTotals(project, allPayments, allExpenses);
  const tone =
    project.status === "completed"
      ? "gain"
      : project.status === "on_hold"
        ? "warn"
        : "primary";

  return (
    <div>
      <PageHeader
        title={project.name}
        subtitle={customer?.name}
        action={
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setEdit(true)} aria-label="تعديل">
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="حذف"
              onClick={() => {
                if (confirm("حذف المشروع وكل دفعاته؟")) {
                  deleteProject(project.id);
                  void navigate({ to: "/projects" });
                }
              }}
            >
              <Trash2 className="size-4 text-loss" />
            </Button>
          </div>
        }
      />

      <div className="space-y-4 px-4 py-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted"
        >
          <ChevronRight className="size-4" /> كل المشاريع
        </Link>

        <div className="rounded-xl bg-surface p-4 shadow-card">
          <div className="flex items-center justify-between">
            <Badge tone={tone}>{STATUS_LABEL[project.status]}</Badge>
            <span className="text-xs text-muted">{formatDate(project.startDate)}</span>
          </div>
          <p className="mt-3 text-sm text-muted">{project.location}</p>
          {project.notes ? <p className="mt-2 text-sm">{project.notes}</p> : null}
          {customer?.phone ? (
            <a
              href={`tel:${customer.phone}`}
              className="mt-3 inline-block text-sm text-primary"
              dir="ltr"
            >
              {customer.phone}
            </a>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="قيمة العقد" value={formatMoney(project.contractAmount, currency)} />
          <Stat label="المحصل" value={formatMoney(t.collected, currency)} gain />
          <Stat label="المتبقي" value={formatMoney(t.remaining, currency)} warn />
          <Stat label="مصروفات المشروع" value={formatMoney(t.spent, currency)} />
          <Stat
            label="الربح المتوقع"
            value={formatMoney(t.expectedProfit, currency)}
            gain={t.expectedProfit >= 0}
            loss={t.expectedProfit < 0}
          />
          <Stat
            label="الربح النقدي"
            value={formatMoney(t.cashProfit, currency)}
            gain={t.cashProfit >= 0}
            loss={t.cashProfit < 0}
          />
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${t.progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted tabular-nums">
          نسبة التحصيل {t.progress}%
        </p>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">الدفعات</h2>
            <Button size="sm" onClick={() => setPayOpen(true)}>
              <Plus className="size-4" /> دفعة
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            {payments.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">لا توجد دفعات</p>
            ) : (
              payments
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((p, i) => (
                  <div
                    key={p.id}
                    className={
                      i
                        ? "flex items-center gap-3 border-t border-line px-4 py-3"
                        : "flex items-center gap-3 px-4 py-3"
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="tabular-nums text-sm font-medium text-gain">
                        {formatMoney(p.amount, currency)}
                      </p>
                      <p className="text-xs text-muted">
                        {formatDate(p.date)} · {METHOD_LABEL[p.method]}
                        {p.notes ? ` · ${p.notes}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="size-10 text-subtle"
                      aria-label="حذف الدفعة"
                      onClick={() => deletePayment(p.id)}
                    >
                      <Trash2 className="mx-auto size-4" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">مصروفات المشروع</h2>
            <Button size="sm" variant="outline" onClick={() => setExpOpen(true)}>
              <Plus className="size-4" /> مصروف
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface shadow-card">
            {expenses.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">لا توجد مصروفات</p>
            ) : (
              expenses
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((e, i) => (
                  <div
                    key={e.id}
                    className={
                      i
                        ? "flex items-center gap-3 border-t border-line px-4 py-3"
                        : "flex items-center gap-3 px-4 py-3"
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="tabular-nums text-sm font-medium text-loss">
                        {formatMoney(e.amount, currency)}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {formatDate(e.date)} · {CATEGORY_LABEL[e.category]}
                        {e.vendor ? ` · ${e.vendor}` : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="size-10 text-subtle"
                      aria-label="حذف المصروف"
                      onClick={() => deleteExpense(e.id)}
                    >
                      <Trash2 className="mx-auto size-4" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>

      <ProjectSheet open={edit} onOpenChange={setEdit} initial={project} />
      <PaymentSheet
        open={payOpen}
        onOpenChange={setPayOpen}
        presetProjectId={project.id}
      />
      <ExpenseSheet
        open={expOpen}
        onOpenChange={setExpOpen}
        presetProjectId={project.id}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  gain,
  loss,
  warn,
}: {
  label: string;
  value: string;
  gain?: boolean;
  loss?: boolean;
  warn?: boolean;
}) {
  const color = gain
    ? "text-gain"
    : loss
      ? "text-loss"
      : warn
        ? "text-warn"
        : "text-ink";
  return (
    <div className="rounded-xl bg-surface p-3.5 shadow-card">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-sm font-semibold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
