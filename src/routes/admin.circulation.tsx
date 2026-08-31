import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AccentButton,
  DangerButton,
  Field,
  GhostButton,
  PrimaryButton,
  Stepper,
  Tabbed,
  TextInput,
} from "@/components/Tabbed";
import {
  books,
  fines as seedFines,
  FINE_RATE_PER_DAY,
  loans as seedLoans,
  members,
  type Book,
  type Loan,
  type Member,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/circulation")({
  head: () => ({
    meta: [
      { title: "Circulation · Issue, Return & Fines · BAI Archives LMS" },
      {
        name: "description",
        content:
          "Issue books with eligibility checks, process returns with automatic overdue fine computation, and settle unpaid fines.",
      },
      { property: "og:title", content: "Circulation · Issue, Return & Fines" },
      {
        property: "og:description",
        content: "The BAI Archives desk workflow for issuing and returning library assets.",
      },
    ],
  }),
  component: CirculationPage,
});

const TODAY = new Date("2026-08-31");

function daysBetween(a: Date, b: Date) {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function CirculationPage() {
  const [loans, setLoans] = useState<Loan[]>(seedLoans);
  const [fines, setFines] = useState(seedFines);

  return (
    <AppShell
      role="admin"
      title="Circulation"
      subtitle="Issue desk, returns desk, and outstanding fines"
    >
      <Tabbed
        tabs={[
          {
            id: "issue",
            label: "Issue Book",
            content: <IssueTab loans={loans} setLoans={setLoans} />,
          },
          {
            id: "return",
            label: "Return Book",
            content: (
              <ReturnTab
                loans={loans}
                setLoans={setLoans}
                onFine={(f) => setFines((prev) => [f, ...prev])}
              />
            ),
          },
          {
            id: "overdue",
            label: "Overdue & Fines",
            content: <OverdueTab loans={loans} fines={fines} setFines={setFines} />,
          },
        ]}
      />
    </AppShell>
  );
}

function eligibility(m: Member, loans: Loan[]) {
  const active = loans.filter(
    (l) => l.studentId === m.studentId && l.status !== "Returned",
  ).length;
  if (m.status !== "Active")
    return { ok: false, reason: `Membership ${m.status} — cannot borrow.` };
  if (m.finesOwed > 0)
    return { ok: false, reason: `Unpaid fines of $${m.finesOwed.toFixed(2)}.` };
  if (active >= m.maxBooks)
    return { ok: false, reason: `Loan limit reached (${active}/${m.maxBooks}).` };
  return { ok: true, reason: `Eligible — ${active}/${m.maxBooks} books out, no fines.` };
}

function IssueTab({
  loans,
  setLoans,
}: {
  loans: Loan[];
  setLoans: (fn: (prev: Loan[]) => Loan[]) => void;
}) {
  const [step, setStep] = useState(0);
  const [member, setMember] = useState<Member | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [due, setDue] = useState("2026-09-14");

  const elig = member ? eligibility(member, loans) : null;
  const activeLoans = loans.filter((l) => l.status !== "Returned");

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <Stepper steps={["Select Student", "Select Book", "Confirm"]} current={step} />

        {step === 0 ? (
          <div className="card-surface p-5">
            <h2 className="font-bold">Step 1 — Student search</h2>
            <ul className="mt-4 divide-y divide-border rounded-md border border-border">
              {members.map((m) => (
                <li key={m.studentId}>
                  <button
                    type="button"
                    onClick={() => setMember(m)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-secondary/60"
                  >
                    <span>
                      <span className="font-semibold">
                        {m.firstName} {m.lastName}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {m.studentId} · {m.department}
                      </span>
                    </span>
                    <StatusBadge>{m.status}</StatusBadge>
                  </button>
                </li>
              ))}
            </ul>

            {member && elig ? (
              <div
                className="mt-4 rounded-md border p-3 text-sm"
                style={{
                  borderColor: elig.ok ? "var(--leaf-green)" : "var(--maroon)",
                  background: elig.ok
                    ? "color-mix(in srgb, var(--success) 8%, white)"
                    : "color-mix(in srgb, var(--maroon) 8%, white)",
                  color: elig.ok ? "var(--success)" : "var(--maroon)",
                }}
              >
                <p className="font-semibold">
                  {elig.ok ? "✓ Eligibility passed" : "✕ Cannot issue"}
                </p>
                <p>{elig.reason}</p>
              </div>
            ) : null}

            <div className="mt-4">
              <PrimaryButton disabled={!elig?.ok} onClick={() => setStep(1)}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="card-surface p-5">
            <h2 className="font-bold">Step 2 — Book search</h2>
            <ul className="mt-4 divide-y divide-border rounded-md border border-border">
              {books.map((b) => {
                const available =
                  b.type === "Physical"
                    ? b.copiesAvailable > 0
                    : b.copiesAvailable > 0;
                return (
                  <li key={b.bookId}>
                    <button
                      type="button"
                      disabled={!available}
                      onClick={() => setBook(b)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-secondary/60 disabled:opacity-45"
                    >
                      <span>
                        <span className="font-semibold">{b.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          {b.authors} ·{" "}
                          {b.type === "Physical"
                            ? `${b.copiesAvailable} copies available`
                            : `${b.copiesAvailable}/${b.maxConcurrent} concurrent slots free`}
                        </span>
                      </span>
                      <span className="flex gap-2">
                        <StatusBadge>{b.type}</StatusBadge>
                        <StatusBadge>
                          {available ? "Available" : "Out of Stock"}
                        </StatusBadge>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex gap-3">
              <GhostButton onClick={() => setStep(0)}>Back</GhostButton>
              <PrimaryButton disabled={!book} onClick={() => setStep(2)}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        ) : null}

        {step === 2 && member && book ? (
          <div className="card-surface space-y-4 p-5">
            <h2 className="font-bold">Step 3 — Confirm issue</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                ["Student", `${member.firstName} ${member.lastName}`],
                ["Student ID", member.studentId],
                ["Title", book.title],
                ["Asset", book.type === "Physical" ? "BC-1001-004" : `EB-${book.bookId.slice(3)}`],
                ["Issue date", "2026-08-31"],
                ["Fine rate", `$${FINE_RATE_PER_DAY.toFixed(2)} / day late`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted-foreground uppercase">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <Field label="Due date (default +14 days)">
              <TextInput
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="max-w-56"
              />
            </Field>
            <div className="flex gap-3">
              <GhostButton onClick={() => setStep(1)}>Back</GhostButton>
              <AccentButton
                onClick={() => {
                  setLoans((prev) => [
                    {
                      issueId: `ISS-${5100 + prev.length}`,
                      studentId: member.studentId,
                      studentName: `${member.firstName} ${member.lastName}`,
                      bookTitle: book.title,
                      assetType: book.type,
                      copyId: book.type === "Physical" ? "BC-1001-004" : `EB-${book.bookId.slice(3)}`,
                      issueDate: "2026-08-31",
                      dueDate: due,
                      returnDate: null,
                      status: "Issued",
                    },
                    ...prev,
                  ]);
                  toast.success(`Issued “${book.title}” to ${member.firstName} — due ${due}`);
                  setStep(0);
                  setMember(null);
                  setBook(null);
                }}
              >
                Issue Book
              </AccentButton>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card-surface h-fit overflow-hidden">
        <h2 className="border-b border-border px-4 py-3 text-sm font-bold">
          Active Loans ({activeLoans.length})
        </h2>
        <ul className="divide-y divide-border">
          {activeLoans.map((l) => (
            <li key={l.issueId} className="px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{l.bookTitle}</span>
                <StatusBadge>{l.status}</StatusBadge>
              </div>
              <p className="text-xs text-muted-foreground">
                {l.studentName} · due {l.dueDate}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReturnTab({
  loans,
  setLoans,
  onFine,
}: {
  loans: Loan[];
  setLoans: (fn: (prev: Loan[]) => Loan[]) => void;
  onFine: (f: (typeof seedFines)[number]) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const open = loans.filter((l) => l.status !== "Returned");
  const record = open.find((l) => l.issueId === selectedId) ?? null;

  const daysLate = useMemo(() => {
    if (!record) return 0;
    return Math.max(0, daysBetween(TODAY, new Date(record.dueDate)));
  }, [record]);
  const fine = daysLate * FINE_RATE_PER_DAY;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-surface p-5">
        <h2 className="font-bold">Search / scan issue record</h2>
        <Field label="Barcode or student name">
          <TextInput placeholder="Scan BC-1004-001 or type a name" />
        </Field>
        <ul className="mt-4 divide-y divide-border rounded-md border border-border">
          {open.map((l) => (
            <li key={l.issueId}>
              <button
                type="button"
                onClick={() => setSelectedId(l.issueId)}
                className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-secondary/60"
              >
                <span>
                  <span className="font-semibold">{l.bookTitle}</span>
                  <span className="block text-xs text-muted-foreground">
                    {l.studentName} · {l.copyId}
                  </span>
                </span>
                <StatusBadge>{l.status}</StatusBadge>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-surface p-5">
        <h2 className="font-bold">Return record</h2>
        {record ? (
          <div className="mt-4 space-y-4 text-sm">
            <dl className="grid grid-cols-2 gap-3">
              {[
                ["Issue ID", record.issueId],
                ["Student", record.studentName],
                ["Title", record.bookTitle],
                ["Asset", `${record.assetType} · ${record.copyId}`],
                ["Issue date", record.issueDate],
                ["Due date", record.dueDate],
                ["Return date", "2026-08-31"],
                ["Days late", String(daysLate)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted-foreground uppercase">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <div
              className="rounded-md border p-4"
              style={{
                borderColor: fine > 0 ? "var(--maroon)" : "var(--leaf-green)",
                background:
                  fine > 0
                    ? "color-mix(in srgb, var(--maroon) 8%, white)"
                    : "color-mix(in srgb, var(--success) 8%, white)",
                color: fine > 0 ? "var(--maroon)" : "var(--success)",
              }}
            >
              <p className="text-xs font-semibold uppercase">Computed fine</p>
              <p className="text-2xl font-bold">
                {fine > 0 ? `$${fine.toFixed(2)}` : "$0 — On time"}
              </p>
              {fine > 0 ? (
                <p className="text-xs">
                  {daysLate} days × ${FINE_RATE_PER_DAY.toFixed(2)}/day · FINE created as
                  Unpaid
                </p>
              ) : null}
            </div>

            <AccentButton
              onClick={() => {
                setLoans((prev) =>
                  prev.map((l) =>
                    l.issueId === record.issueId
                      ? { ...l, status: "Returned", returnDate: "2026-08-31" }
                      : l,
                  ),
                );
                if (fine > 0) {
                  onFine({
                    fineId: `FN-31${Math.floor(Math.random() * 90) + 10}`,
                    issueId: record.issueId,
                    studentId: record.studentId,
                    studentName: record.studentName,
                    bookTitle: record.bookTitle,
                    daysLate,
                    ratePerDay: FINE_RATE_PER_DAY,
                    amount: fine,
                    paymentStatus: "Unpaid",
                    paidDate: null,
                  });
                }
                toast.success(
                  fine > 0
                    ? `Returned with $${fine.toFixed(2)} fine recorded as Unpaid`
                    : "Returned on time — copy set back to Available",
                );
                setSelectedId(null);
              }}
            >
              Confirm Return
            </AccentButton>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Pick an open issue record on the left to compute its return.
          </p>
        )}
      </div>
    </div>
  );
}

function OverdueTab({
  loans,
  fines,
  setFines,
}: {
  loans: Loan[];
  fines: typeof seedFines;
  setFines: (fn: (prev: typeof seedFines) => typeof seedFines) => void;
}) {
  const overdue = loans.filter(
    (l) => l.status !== "Returned" && daysBetween(TODAY, new Date(l.dueDate)) > 0,
  );

  return (
    <div className="space-y-6">
      <div className="card-surface overflow-hidden">
        <h2 className="border-b border-border px-4 py-3 text-sm font-bold">
          Overdue records ({overdue.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase">
              <tr>
                <th className="px-4 py-2.5">Issue ID</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Due</th>
                <th className="px-4 py-2.5">Days overdue</th>
                <th className="px-4 py-2.5">Accruing fine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {overdue.map((l) => {
                const d = daysBetween(TODAY, new Date(l.dueDate));
                return (
                  <tr key={l.issueId}>
                    <td className="px-4 py-3 font-medium">{l.issueId}</td>
                    <td className="px-4 py-3">{l.studentName}</td>
                    <td className="px-4 py-3">{l.bookTitle}</td>
                    <td className="px-4 py-3">{l.dueDate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone="danger">{`${d} days`}</StatusBadge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--maroon)]">
                      ${(d * FINE_RATE_PER_DAY).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <h2 className="border-b border-border px-4 py-3 text-sm font-bold">
          Fines ledger
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold uppercase">
              <tr>
                <th className="px-4 py-2.5">Fine ID</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Days late</th>
                <th className="px-4 py-2.5">Amount</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fines.map((f) => (
                <tr key={f.fineId}>
                  <td className="px-4 py-3 font-medium">{f.fineId}</td>
                  <td className="px-4 py-3">{f.studentName}</td>
                  <td className="px-4 py-3">{f.bookTitle}</td>
                  <td className="px-4 py-3">{f.daysLate}</td>
                  <td className="px-4 py-3 font-semibold">${f.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge>{f.paymentStatus}</StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    {f.paymentStatus === "Unpaid" ? (
                      <PrimaryButton
                        className="h-8 px-3 text-xs"
                        onClick={() => {
                          setFines((prev) =>
                            prev.map((x) =>
                              x.fineId === f.fineId
                                ? {
                                    ...x,
                                    paymentStatus: "Paid" as const,
                                    paidDate: "2026-08-31",
                                  }
                                : x,
                            ),
                          );
                          toast.success(`${f.fineId} marked as paid`);
                        }}
                      >
                        Mark Paid
                      </PrimaryButton>
                    ) : (
                      <DangerButton
                        className="h-8 px-3 text-xs"
                        onClick={() => {
                          setFines((prev) =>
                            prev.map((x) =>
                              x.fineId === f.fineId
                                ? {
                                    ...x,
                                    paymentStatus: "Unpaid" as const,
                                    paidDate: null,
                                  }
                                : x,
                            ),
                          );
                          toast("Reverted to unpaid");
                        }}
                      >
                        Mark Unpaid
                      </DangerButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
