import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Tabbed({
  tabs,
}: {
  tabs: { id: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]!.id);
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              active === t.id
                ? "text-primary"
                : "text-muted-foreground hover:text-[var(--leaf-green)]",
            )}
          >
            {t.label}
            {active === t.id ? (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--banana-gold)]" />
            ) : null}
          </button>
        ))}
      </div>
      <div className="pt-5">{tabs.find((t) => t.id === active)!.content}</div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-[var(--leaf-green)] focus:outline-none",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-24 w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-[var(--leaf-green)] focus:outline-none",
        props.className,
      )}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-[var(--leaf-green)] focus:outline-none",
        props.className,
      )}
    />
  );
}

export function PrimaryButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--leaf-green)] disabled:opacity-50",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

export function AccentButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-[var(--banana-gold)] px-4 text-sm font-semibold text-[var(--charcoal-text)] transition-all hover:brightness-95 disabled:opacity-50",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-input bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-[var(--maroon)] px-4 text-sm font-semibold text-[var(--maroon)] transition-colors hover:bg-[var(--maroon)] hover:text-white",
        rest.className,
      )}
    >
      {children}
    </button>
  );
}

export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="mb-6 flex flex-wrap gap-2">
      {steps.map((s, i) => (
        <li
          key={s}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
            i === current
              ? "border-[var(--banana-gold)] bg-[color-mix(in_srgb,var(--banana-gold)_18%,white)] text-[var(--charcoal-text)]"
              : i < current
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground",
          )}
        >
          <span>{i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}
