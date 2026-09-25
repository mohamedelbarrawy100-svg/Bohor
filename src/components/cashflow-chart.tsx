import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber, monthLabel } from "@/lib/format";
import type { MonthPoint } from "@/lib/reports";

type ChartRow = MonthPoint & { label: string };

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2 text-xs">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className="tabular-nums text-muted">
          {p.dataKey === "collected" ? "تحصيل" : "صرف"}: {formatNumber(Number(p.value ?? 0))}
        </p>
      ))}
    </div>
  );
}

export function CashflowChart({ data }: { data: MonthPoint[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return <div className="h-44 rounded-lg bg-surface-2" />;
  }
  const rows: ChartRow[] = data.map((d) => ({
    ...d,
    label: monthLabel(d.key).split(" ")[0] ?? d.key,
  }));
  return (
    <div dir="ltr" className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} barGap={3} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-muted)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => formatNumber(v)}
          />
          <Tooltip cursor={{ fill: "rgba(26,25,22,0.04)" }} content={<ChartTip />} />
          <Bar dataKey="collected" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="spent" fill="var(--color-subtle)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
