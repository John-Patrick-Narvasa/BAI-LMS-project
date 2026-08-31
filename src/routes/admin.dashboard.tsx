import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { kpis, loans, loansTrend, popularTitles } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard · BAI Archives LMS" },
      {
        name: "description",
        content:
          "Library KPIs for The BAI Archives: total books, active issues, overdue items, fines collected and member counts.",
      },
      { property: "og:title", content: "Admin Dashboard · BAI Archives LMS" },
      {
        property: "og:description",
        content: "Circulation analytics and library KPIs at a glance.",
      },
    ],
  }),
  component: AdminDashboard,
});

function Kpi({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="card-surface p-4">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className="mt-2 text-2xl font-bold"
        style={{ color: tone ?? "var(--primary-green)" }}
      >
        {value}
      </p>
    </div>
  );
}

function AdminDashboard() {
  return (
    <AppShell
      role="admin"
      title="Dashboard"
      subtitle="Circulation health for the current term"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Kpi label="Total Books" value={kpis.totalBooks.toLocaleString()} />
        <Kpi label="Active Issues" value={String(kpis.activeIssues)} />
        <Kpi
          label="Overdue Books"
          value={String(kpis.overdueBooks)}
          tone="var(--maroon)"
        />
        <Kpi
          label="Fines Collected (Aug)"
          value={`$${kpis.finesCollected.toFixed(2)}`}
          tone="#7a5c00"
        />
        <Kpi label="Total Members" value={kpis.totalMembers.toLocaleString()} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card-surface p-4">
          <h2 className="text-sm font-bold">Loans — last 30 days</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loansTrend}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" fontSize={11} stroke="var(--muted-text)" />
                <YAxis fontSize={11} stroke="var(--muted-text)" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="var(--primary-green)"
                  strokeWidth={2.5}
                  dot={{ fill: "var(--banana-gold)", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-4">
          <h2 className="text-sm font-bold">Most popular titles</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularTitles}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="title" fontSize={10} stroke="var(--muted-text)" />
                <YAxis fontSize={11} stroke="var(--muted-text)" />
                <Tooltip />
                <Bar dataKey="loans" fill="var(--banana-gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 card-surface overflow-hidden">
        <h2 className="border-b border-border px-4 py-3 text-sm font-bold">
          Recent circulation activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold text-secondary-foreground uppercase">
              <tr>
                <th className="px-4 py-2.5">Issue ID</th>
                <th className="px-4 py-2.5">Student</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Due</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loans.slice(0, 6).map((l) => (
                <tr key={l.issueId}>
                  <td className="px-4 py-2.5 font-medium">{l.issueId}</td>
                  <td className="px-4 py-2.5">{l.studentName}</td>
                  <td className="px-4 py-2.5">{l.bookTitle}</td>
                  <td className="px-4 py-2.5">{l.dueDate}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge>{l.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
