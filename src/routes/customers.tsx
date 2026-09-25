import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CustomerSheet } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { customerBalance } from "@/lib/reports";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/customers")({ component: CustomersPage });

function CustomersPage() {
  const customers = useAppStore((s) => s.customers);
  const projects = useAppStore((s) => s.projects);
  const payments = useAppStore((s) => s.payments);
  const currency = useAppStore((s) => s.settings.currency);
  const deleteCustomer = useAppStore((s) => s.deleteCustomer);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      customers.map((c) => ({
        ...c,
        projectCount: projects.filter((p) => p.customerId === c.id).length,
        due: customerBalance(c.id, projects, payments),
      })),
    [customers, projects, payments],
  );

  const editing = customers.find((c) => c.id === editId) ?? null;

  return (
    <div>
      <PageHeader
        title="العملاء"
        subtitle={`${customers.length} عميل`}
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="size-4" /> جديد
          </Button>
        }
      />
      <div className="space-y-2 px-4 py-4">
        <p className="text-sm text-muted">
          سجل بيانات العملاء واربط كل مشروع بصاحبه.
        </p>
        {rows.length === 0 ? (
          <div className="rounded-xl bg-surface px-4 py-12 text-center shadow-card">
            <p className="font-medium">لا يوجد عملاء بعد</p>
            <Button className="mt-4" onClick={() => setOpen(true)}>
              إضافة عميل
            </Button>
          </div>
        ) : (
          rows.map((c) => (
            <div key={c.id} className="rounded-xl bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  className="min-w-0 text-start"
                  onClick={() => setEditId(c.id)}
                >
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.address || "بدون عنوان"}</p>
                </button>
                <button
                  type="button"
                  className="size-10 shrink-0 text-subtle"
                  aria-label="حذف العميل"
                  onClick={() => {
                    if (confirm("حذف العميل ومشاريعه؟")) deleteCustomer(c.id);
                  }}
                >
                  <Trash2 className="mx-auto size-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                {c.phone ? (
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-1.5 text-primary"
                    dir="ltr"
                  >
                    <Phone className="size-3.5" />
                    {c.phone}
                  </a>
                ) : (
                  <span className="text-muted">بدون هاتف</span>
                )}
                <span className="text-xs text-muted">
                  {c.projectCount} مشروع · متبقي{" "}
                  <span className="tabular-nums text-warn">
                    {formatMoney(c.due, currency)}
                  </span>
                </span>
              </div>
              {c.projectCount > 0 ? (
                <Link
                  to="/projects"
                  className="mt-3 block text-xs text-muted"
                >
                  عرض المشاريع
                </Link>
              ) : null}
            </div>
          ))
        )}
      </div>
      <CustomerSheet open={open} onOpenChange={setOpen} />
      <CustomerSheet
        open={Boolean(editId)}
        onOpenChange={(v) => {
          if (!v) setEditId(null);
        }}
        initial={editing}
      />
    </div>
  );
}
