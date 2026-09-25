import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ProjectSheet } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney, STATUS_LABEL } from "@/lib/format";
import { projectTotals } from "@/lib/reports";
import { useAppStore } from "@/lib/store";
import type { ProjectStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({ component: ProjectsPage });

const FILTERS: Array<{ id: "all" | ProjectStatus; label: string }> = [
  { id: "all", label: "الكل" },
  { id: "in_progress", label: "جاري" },
  { id: "completed", label: "مكتمل" },
  { id: "planning", label: "تخطيط" },
  { id: "on_hold", label: "متوقف" },
];

function ProjectsPage() {
  const projects = useAppStore((s) => s.projects);
  const customers = useAppStore((s) => s.customers);
  const payments = useAppStore((s) => s.payments);
  const expenses = useAppStore((s) => s.expenses);
  const currency = useAppStore((s) => s.settings.currency);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const needle = q.trim();
    return projects.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (!needle) return true;
      const customer = customers.find((c) => c.id === p.customerId)?.name ?? "";
      return `${p.name} ${p.location} ${customer}`.includes(needle);
    });
  }, [projects, customers, q, filter]);

  return (
    <div>
      <PageHeader
        title="المشاريع"
        subtitle={`${projects.length} مشروع`}
        action={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="size-4" /> جديد
          </Button>
        }
      />
      <div className="space-y-3 px-4 py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="بحث بالاسم أو العميل"
            className="pr-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150",
                filter === f.id
                  ? "bg-primary text-primary-fg"
                  : "bg-surface text-muted shadow-card",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="rounded-xl bg-surface px-4 py-12 text-center shadow-card">
            <p className="font-medium">لا توجد مشاريع</p>
            <p className="mt-1 text-sm text-muted">أضف مشروعًا واربطه بعميل.</p>
            <Button className="mt-4" onClick={() => setOpen(true)}>
              إضافة مشروع
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {rows.map((p) => {
              const t = projectTotals(p, payments, expenses);
              const customer = customers.find((c) => c.id === p.customerId);
              const tone =
                p.status === "completed"
                  ? "gain"
                  : p.status === "on_hold"
                    ? "warn"
                    : p.status === "planning"
                      ? "default"
                      : "primary";
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
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {customer?.name} · {p.location}
                      </p>
                    </div>
                    <Badge tone={tone}>{STATUS_LABEL[p.status]}</Badge>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${t.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <span className="text-muted">
                      العقد
                      <span className="mt-0.5 block tabular-nums text-ink">
                        {formatMoney(p.contractAmount, currency)}
                      </span>
                    </span>
                    <span className="text-muted">
                      محصل
                      <span className="mt-0.5 block tabular-nums text-gain">
                        {formatMoney(t.collected, currency)}
                      </span>
                    </span>
                    <span className="text-muted">
                      متبقي
                      <span className="mt-0.5 block tabular-nums text-warn">
                        {formatMoney(t.remaining, currency)}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <ProjectSheet open={open} onOpenChange={setOpen} />
    </div>
  );
}
