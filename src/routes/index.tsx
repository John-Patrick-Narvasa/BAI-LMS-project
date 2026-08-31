import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In · The BAI Archives Library System" },
      {
        name: "description",
        content:
          "Sign in to The BAI Archives library management system to browse the catalog, manage loans, members and fines.",
      },
      { property: "og:title", content: "Sign In · The BAI Archives Library System" },
      {
        property: "og:description",
        content:
          "Library management for physical and digital collections — catalog, members, issuing and returns.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="leaf-pattern flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md card-surface p-7">
        <div className="flex items-center gap-3">
          <Logo size={46} />
          <div>
            <h1 className="text-xl font-bold text-foreground">The BAI Archives</h1>
            <p className="text-xs text-muted-foreground">
              Books of Art and Intelligence · Library Management System
            </p>
          </div>
        </div>

        <form
          className="mt-7 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-sm font-semibold" htmlFor="id">
              Student / Staff ID
            </label>
            <input
              id="id"
              defaultValue="2023-00145"
              className="mt-1.5 h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-[var(--leaf-green)] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="pw">
              Password
            </label>
            <input
              id="pw"
              type="password"
              defaultValue="library"
              className="mt-1.5 h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-[var(--leaf-green)] focus:outline-none"
            />
          </div>
        </form>

        <p className="mt-7 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Continue as
        </p>
        <div className="mt-2 grid gap-3">
          <Link
            to="/student/home"
            className="flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--leaf-green)]"
          >
            Student
          </Link>
          <Link
            to="/admin/dashboard"
            className="flex h-11 items-center justify-center rounded-md bg-[var(--banana-gold)] text-sm font-semibold text-[var(--charcoal-text)] transition-colors hover:brightness-95"
          >
            Admin (Librarian)
          </Link>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Prototype build · sample records only
        </p>
      </div>
    </div>
  );
}
