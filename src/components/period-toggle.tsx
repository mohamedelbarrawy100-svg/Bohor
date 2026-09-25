import { PERIOD_LABEL } from "@/lib/format";
import type { PeriodKey } from "@/lib/types";
import { cn } from "@/lib/utils";

const KEYS: PeriodKey[] = ["month", "year", "all"];

export function PeriodToggle({
  value,
  onChange,
}: {
  value: PeriodKey;
  onChange: (value: PeriodKey) => void;
}) {
  return (
    <div className="grid grid-cols-3 rounded-lg bg-surface-2 p-1">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "h-9 rounded-md text-sm font-medium transition-[background-color,color,scale] duration-150",
            value === key
              ? "bg-surface text-ink shadow-sm"
              : "text-muted hover:text-ink",
          )}
        >
          {PERIOD_LABEL[key]}
        </button>
      ))}
    </div>
  );
}
