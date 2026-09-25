import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  CATEGORY_LABEL,
  METHOD_LABEL,
  STATUS_LABEL,
} from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type {
  Customer,
  Expense,
  ExpenseCategory,
  Payment,
  PaymentMethod,
  Project,
  ProjectStatus,
} from "@/lib/types";
import { todayIso } from "@/lib/utils";

export function CustomerSheet({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Customer | null;
}) {
  const addCustomer = useAppStore((s) => s.addCustomer);
  const updateCustomer = useAppStore((s) => s.updateCustomer);
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const reset = (c?: Customer | null) => {
    setName(c?.name ?? "");
    setPhone(c?.phone ?? "");
    setAddress(c?.address ?? "");
    setNotes(c?.notes ?? "");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (v) reset(initial);
        onOpenChange(v);
      }}
    >
      <SheetContent title={initial ? "تعديل عميل" : "عميل جديد"}>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            const payload = {
              name: name.trim(),
              phone: phone.trim(),
              address: address.trim(),
              notes: notes.trim(),
            };
            if (initial) updateCustomer(initial.id, payload);
            else addCustomer(payload);
            onOpenChange(false);
          }}
        >
          <Field label="اسم العميل">
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="الهاتف">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              dir="ltr"
              className="text-start"
            />
          </Field>
          <Field label="العنوان">
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <Field label="ملاحظات">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            حفظ
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function ProjectSheet({
  open,
  onOpenChange,
  initial,
  presetCustomerId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Project | null;
  presetCustomerId?: string;
}) {
  const customers = useAppStore((s) => s.customers);
  const addProject = useAppStore((s) => s.addProject);
  const updateProject = useAppStore((s) => s.updateProject);
  const [customerId, setCustomerId] = useState(
    initial?.customerId ?? presetCustomerId ?? customers[0]?.id ?? "",
  );
  const [name, setName] = useState(initial?.name ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [amount, setAmount] = useState(
    initial ? String(initial.contractAmount) : "",
  );
  const [startDate, setStartDate] = useState(initial?.startDate ?? todayIso());
  const [status, setStatus] = useState<ProjectStatus>(
    initial?.status ?? "in_progress",
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const reset = (p?: Project | null) => {
    setCustomerId(p?.customerId ?? presetCustomerId ?? customers[0]?.id ?? "");
    setName(p?.name ?? "");
    setLocation(p?.location ?? "");
    setAmount(p ? String(p.contractAmount) : "");
    setStartDate(p?.startDate ?? todayIso());
    setStatus(p?.status ?? "in_progress");
    setNotes(p?.notes ?? "");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (v) reset(initial);
        onOpenChange(v);
      }}
    >
      <SheetContent title={initial ? "تعديل مشروع" : "مشروع جديد"}>
        {customers.length === 0 ? (
          <p className="py-6 text-sm text-muted">
            أضف عميلًا أولاً من صفحة العملاء قبل إنشاء مشروع.
          </p>
        ) : (
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !customerId) return;
            const payload = {
              customerId,
              name: name.trim(),
              location: location.trim(),
              contractAmount: Number(amount) || 0,
              startDate,
              status,
              notes: notes.trim(),
            };
            if (initial) updateProject(initial.id, payload);
            else addProject(payload);
            onOpenChange(false);
          }}
        >
          <Field label="العميل">
            <NativeSelect
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            >
              <option value="" disabled>
                اختر العميل
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="اسم المشروع">
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field label="الموقع">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="قيمة التعاقد">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              dir="ltr"
              className="text-start tabular-nums"
              required
            />
          </Field>
          <Field label="تاريخ البدء">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Field>
          <Field label="الحالة">
            <NativeSelect
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            >
              {(Object.keys(STATUS_LABEL) as ProjectStatus[]).map((k) => (
                <option key={k} value={k}>
                  {STATUS_LABEL[k]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="ملاحظات">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            حفظ
          </Button>
        </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function PaymentSheet({
  open,
  onOpenChange,
  initial,
  presetProjectId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Payment | null;
  presetProjectId?: string;
}) {
  const projects = useAppStore((s) => s.projects);
  const addPayment = useAppStore((s) => s.addPayment);
  const updatePayment = useAppStore((s) => s.updatePayment);
  const [projectId, setProjectId] = useState(
    initial?.projectId ?? presetProjectId ?? projects[0]?.id ?? "",
  );
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [date, setDate] = useState(initial?.date ?? todayIso());
  const [method, setMethod] = useState<PaymentMethod>(initial?.method ?? "cash");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const reset = (p?: Payment | null) => {
    setProjectId(p?.projectId ?? presetProjectId ?? projects[0]?.id ?? "");
    setAmount(p ? String(p.amount) : "");
    setDate(p?.date ?? todayIso());
    setMethod(p?.method ?? "cash");
    setNotes(p?.notes ?? "");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (v) reset(initial);
        onOpenChange(v);
      }}
    >
      <SheetContent title={initial ? "تعديل دفعة" : "تحصيل دفعة"}>
        {projects.length === 0 ? (
          <p className="py-6 text-sm text-muted">أضف مشروعًا أولاً حتى تستطيع تسجيل دفعة.</p>
        ) : (
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!projectId) return;
            const payload = {
              projectId,
              amount: Number(amount) || 0,
              date,
              method,
              notes: notes.trim(),
            };
            if (initial) updatePayment(initial.id, payload);
            else addPayment(payload);
            onOpenChange(false);
          }}
        >
          <Field label="المشروع">
            <NativeSelect
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="" disabled>
                اختر المشروع
              </option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="المبلغ">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              dir="ltr"
              className="text-start tabular-nums"
              required
            />
          </Field>
          <Field label="التاريخ">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="طريقة الدفع">
            <NativeSelect
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
            >
              {(Object.keys(METHOD_LABEL) as PaymentMethod[]).map((k) => (
                <option key={k} value={k}>
                  {METHOD_LABEL[k]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="بيان">
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            حفظ الدفعة
          </Button>
        </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function ExpenseSheet({
  open,
  onOpenChange,
  initial,
  presetProjectId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Expense | null;
  presetProjectId?: string;
}) {
  const projects = useAppStore((s) => s.projects);
  const addExpense = useAppStore((s) => s.addExpense);
  const updateExpense = useAppStore((s) => s.updateExpense);
  const [projectId, setProjectId] = useState(
    initial?.projectId ?? presetProjectId ?? "",
  );
  const [category, setCategory] = useState<ExpenseCategory>(
    initial?.category ?? "materials",
  );
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [date, setDate] = useState(initial?.date ?? todayIso());
  const [vendor, setVendor] = useState(initial?.vendor ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const reset = (e?: Expense | null) => {
    setProjectId(e?.projectId ?? presetProjectId ?? "");
    setCategory(e?.category ?? "materials");
    setAmount(e ? String(e.amount) : "");
    setDate(e?.date ?? todayIso());
    setVendor(e?.vendor ?? "");
    setNotes(e?.notes ?? "");
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (v) reset(initial);
        onOpenChange(v);
      }}
    >
      <SheetContent title={initial ? "تعديل مصروف" : "مصروف جديد"}>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              projectId: projectId || null,
              category,
              amount: Number(amount) || 0,
              date,
              vendor: vendor.trim(),
              notes: notes.trim(),
            };
            if (initial) updateExpense(initial.id, payload);
            else addExpense(payload);
            onOpenChange(false);
          }}
        >
          <Field label="التصنيف">
            <NativeSelect
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            >
              {(Object.keys(CATEGORY_LABEL) as ExpenseCategory[]).map((k) => (
                <option key={k} value={k}>
                  {CATEGORY_LABEL[k]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="المشروع (اختياري)">
            <NativeSelect
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">مصروف عام — بدون مشروع</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="المبلغ">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              dir="ltr"
              className="text-start tabular-nums"
              required
            />
          </Field>
          <Field label="التاريخ">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="المورد / الجهة">
            <Input value={vendor} onChange={(e) => setVendor(e.target.value)} />
          </Field>
          <Field label="بيان">
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Button type="submit" className="mt-2 w-full">
            حفظ المصروف
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
