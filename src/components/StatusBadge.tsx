import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "neutral" | "info";

const toneMap: Record<Tone, string> = {
  success: "bg-[color-mix(in_srgb,var(--success)_14%,white)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_35%,white)]",
  warning: "bg-[color-mix(in_srgb,var(--warning)_20%,white)] text-[#7a5c00] border-[color-mix(in_srgb,var(--warning)_45%,white)]",
  danger: "bg-[color-mix(in_srgb,var(--danger)_12%,white)] text-[var(--danger)] border-[color-mix(in_srgb,var(--danger)_32%,white)]",
  neutral: "bg-muted text-muted-foreground border-border",
  info: "bg-[color-mix(in_srgb,var(--primary-green)_10%,white)] text-primary border-[color-mix(in_srgb,var(--primary-green)_28%,white)]",
};

export function statusTone(value: string): Tone {
  const v = value.toLowerCase();
  if (["available", "returned", "active", "paid", "on time", "eligible"].includes(v))
    return "success";
  if (["due soon", "pending", "reserved", "issued"].includes(v)) return "warning";
  if (["overdue", "suspended", "unpaid", "expired", "out of stock", "blocked"].includes(v))
    return "danger";
  if (["physical", "digital"].includes(v)) return "info";
  return "neutral";
}

export function StatusBadge({
  children,
  tone,
  className,
}: {
  children: string;
  tone?: Tone;
  className?: string;
}) {
  const resolved = tone ?? statusTone(children);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneMap[resolved],
        className,
      )}
    >
      {children}
    </span>
  );
}
