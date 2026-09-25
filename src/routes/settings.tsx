import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Field, NativeSelect } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CURRENCY_LABEL } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { CurrencyCode } from "@/lib/types";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const loadDemo = useAppStore((s) => s.loadDemo);
  const resetAll = useAppStore((s) => s.resetAll);

  return (
    <div>
      <PageHeader title="الإعدادات" subtitle="بيانات الشركة والدفاتر" />
      <div className="space-y-5 px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted">
          <ChevronRight className="size-4" /> الرئيسية
        </Link>

        <section className="space-y-4 rounded-xl bg-surface p-4 shadow-card">
          <h2 className="text-sm font-semibold">بيانات الشركة</h2>
          <Field label="اسم الشركة">
            <Input
              value={settings.companyName}
              onChange={(e) => updateSettings({ companyName: e.target.value })}
            />
          </Field>
          <Field label="اسم صاحب العمل">
            <Input
              value={settings.ownerName}
              onChange={(e) => updateSettings({ ownerName: e.target.value })}
            />
          </Field>
          <Field label="الهاتف">
            <Input
              value={settings.phone}
              onChange={(e) => updateSettings({ phone: e.target.value })}
              inputMode="tel"
              dir="ltr"
              className="text-start"
            />
          </Field>
          <Field label="رأس المال الافتتاحي">
            <Input
              value={String(settings.openingCapital)}
              onChange={(e) =>
                updateSettings({ openingCapital: Number(e.target.value) || 0 })
              }
              inputMode="numeric"
              dir="ltr"
              className="text-start tabular-nums"
            />
          </Field>
          <Field label="العملة">
            <NativeSelect
              value={settings.currency}
              onChange={(e) =>
                updateSettings({ currency: e.target.value as CurrencyCode })
              }
            >
              {(Object.keys(CURRENCY_LABEL) as CurrencyCode[]).map((code) => (
                <option key={code} value={code}>
                  {CURRENCY_LABEL[code]} ({code})
                </option>
              ))}
            </NativeSelect>
          </Field>
        </section>

        <section className="space-y-3 rounded-xl bg-surface p-4 shadow-card">
          <h2 className="text-sm font-semibold">البيانات</h2>
          <p className="text-sm text-muted">
            التطبيق يحفظ كل شيء على هذا الموبايل. يمكنك تحميل أمثلة للتجربة أو مسح
            الدفاتر والبدء من صفر.
          </p>
          <Button variant="outline" className="w-full" onClick={() => loadDemo()}>
            تحميل بيانات تجريبية
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              if (confirm("مسح كل العملاء والمشاريع والحركات؟")) resetAll();
            }}
          >
            مسح كل البيانات
          </Button>
        </section>

        <p className="px-1 pb-4 text-center text-xs text-subtle">
          دفتر المقاول — حسابات بسيطة لشركات التشطيبات والمقاولات الصغيرة.
          أضفه إلى الشاشة الرئيسية من المتصفح لاستخدامه كتطبيق.
        </p>
      </div>
    </div>
  );
}
