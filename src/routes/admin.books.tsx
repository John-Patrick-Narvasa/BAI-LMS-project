import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AccentButton,
  Field,
  GhostButton,
  PrimaryButton,
  SelectInput,
  Stepper,
  Tabbed,
  TextArea,
  TextInput,
} from "@/components/Tabbed";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { books, categories, locations, type Book } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/books")({
  head: () => ({
    meta: [
      { title: "Books · Catalog & Book Entry · BAI Archives LMS" },
      {
        name: "description",
        content:
          "Browse the BAI Archives catalog and register received physical copies or e-books through the guided Book Entry flow.",
      },
      { property: "og:title", content: "Books · Catalog & Book Entry" },
      {
        property: "og:description",
        content: "Catalog view plus the five-step Book Entry wizard for new acquisitions.",
      },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return (
    <AppShell
      role="admin"
      title="Books"
    >
      <Tabbed
        tabs={[
          { id: "catalog", label: "Catalog View", content: <CatalogTab /> },
          { id: "entry", label: "Add/Edit Book (Entry Flow)", content: <EntryWizard /> },
        ]}
      />
    </AppShell>
  );
}

function CatalogTab() {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [selected, setSelected] = useState<Book | null>(null);

  const rows = books.filter((b) => {
    const status = b.copiesAvailable > 0 ? "Available" : "Out of Stock";
    return (
      (category === "All" || b.category === category) &&
      (type === "All" || b.type === type) &&
      (availability === "All" || status === availability)
    );
  });

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Category">
          <SelectInput value={category} onChange={(e) => setCategory(e.target.value)}>
            {["All", ...categories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Type">
          <SelectInput value={type} onChange={(e) => setType(e.target.value)}>
            {["All", "Physical", "Digital"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Status">
          <SelectInput
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            {["All", "Available", "Out of Stock"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <div className="mt-5 card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs font-semibold text-secondary-foreground uppercase">
              <tr>
                <th className="px-4 py-2.5">Cover</th>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Author(s)</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">ISBN-13</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Copies</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((b) => (
                <tr
                  key={b.bookId}
                  onClick={() => setSelected(b)}
                  className="cursor-pointer hover:bg-secondary/60"
                >
                  <td className="px-4 py-2">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="h-12 w-9 rounded object-cover shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">{b.title}</td>
                  <td className="px-4 py-3">{b.authors}</td>
                  <td className="px-4 py-3">{b.category}</td>
                  <td className="px-4 py-3 font-mono text-xs">{b.isbn13}</td>
                  <td className="px-4 py-3">
                    <StatusBadge>{b.type}</StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    {b.copiesAvailable}/{b.copiesTotal}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge>
                      {b.copiesAvailable > 0 ? "Available" : "Out of Stock"}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader>
                <div className="mb-3 flex justify-center">
                  <img
                    src={selected.cover}
                    alt={selected.title}
                    className="h-44 w-32 rounded-md object-cover shadow-md"
                  />
                </div>
                <SheetTitle>{selected.title}</SheetTitle>
                <SheetDescription>{selected.authors}</SheetDescription>
              </SheetHeader>
              <div className="space-y-3 px-4 pb-6 text-sm">
                <div className="flex gap-2">
                  <StatusBadge>{selected.type}</StatusBadge>
                  <StatusBadge>
                    {selected.copiesAvailable > 0 ? "Available" : "Out of Stock"}
                  </StatusBadge>
                </div>
                <p className="text-muted-foreground">{selected.summary}</p>
                <dl className="grid grid-cols-2 gap-3">
                  {[
                    ["Book ID", selected.bookId],
                    ["Category", selected.category],
                    ["Publisher", selected.publisher],
                    ["Year", String(selected.year)],
                    ["Language", selected.language],
                    ["Pages", String(selected.pages)],
                    ["ISBN-10", selected.isbn10],
                    ["ISBN-13", selected.isbn13],
                    ["Call Number", selected.callNumber],
                    selected.type === "Physical"
                      ? ["Location", selected.location ?? "—"]
                      : ["File Format", selected.fileFormat ?? "—"],
                    selected.type === "Digital"
                      ? ["Max Concurrent", String(selected.maxConcurrent ?? 0)]
                      : ["Copies", `${selected.copiesAvailable}/${selected.copiesTotal}`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs text-muted-foreground uppercase">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Keywords</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {selected.keywords.map((k) => (
                      <StatusBadge key={k} tone="neutral">
                        {k}
                      </StatusBadge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

const wizardSteps = [
  "ISBN Check",
  "Core Info",
  "Edition Info",
  "Asset Details",
  "Finalize",
];

function EntryWizard() {
  const [step, setStep] = useState(0);
  const [isbn, setIsbn] = useState("978-1501110368");
  const [exists, setExists] = useState(false);
  const [assetType, setAssetType] = useState<"Physical" | "Digital">("Physical");
  const [quantity, setQuantity] = useState(5);
  const [done, setDone] = useState(false);

  const [bookForm, setBookForm] = useState({
    title: "It Ends with Us",
    authors: "Colleen Hoover",
    category: "Science",
    keywords:
      "Contemporary Fiction, Romance, Drama, Relationships, Domestic Violence, Resilience",
    summary:
      "A deeply personal story following Lily Bloom as she navigates a complex romantic relationship while confronting childhood trauma and difficult choices regarding cycle-breaking and emotional boundaries.",

    edition: "1",
    publisher: "Atria Books",
    publicationYear: "2016",
    language: "English",
    pages: "384",
    callNumber: "PS3608.O623 I84 2016",
    price: "16.99",

    format: "Paperback",
    location: "Main Library - Shelf B2",
    copyStatus: "Available",
    condition: "Good",
    replacementCost: "16.99",
    procurementRecord: "PR-2026-FIC-082",

    licensedQuantity: "1",
    fileFormat: "PDF",
    accessUrl: "https://ebooks.bai.edu/it-ends-with-us",
    fileSize: "18.4",
    maxConcurrent: "6",
    copyrightStatus: "Licensed",
    accessRestrictions: "Campus network only",
  });

  const match = books.find((b) => b.isbn13 === isbn.trim() || b.isbn10 === isbn.trim());

  if (done) {
    return (
      <div className="card-surface mx-auto max-w-lg p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--success)_16%,white)] text-2xl text-[var(--success)]">
          ✓
        </div>
        <h2 className="mt-4 text-lg font-bold">Book committed successfully</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {assetType === "Physical"
            ? `${quantity} physical copies inserted with generated barcodes (BC-9021-001 … BC-9021-00${quantity}).`
            : "E-book record inserted with generated ID EB-9021."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <PrimaryButton
            onClick={() => {
              setDone(false);
              setStep(0);
              setIsbn("");
              setExists(false);
            }}
          >
            Enter another book
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Stepper steps={wizardSteps} current={step} />

      {step === 0 ? (
        <div className="card-surface space-y-4 p-5">
          <h2 className="font-bold">Step 1 — ISBN / Title check</h2>
          <Field label="ISBN-10 / ISBN-13 or Title">
            <TextInput
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="e.g. 978-1501110368"
            />
          </Field>
          {isbn.trim() ? (
            <div
              className="rounded-md border p-3 text-sm"
              style={{
                borderColor: match ? "var(--leaf-green)" : "var(--border)",
                background: match
                  ? "color-mix(in srgb, var(--success) 8%, white)"
                  : "var(--muted)",
              }}
            >
              {match ? (
                <>
                  <span className="font-semibold">Exists in DB — </span>
                  edition_id fetched for “{match.title}” ({match.bookId}). Core and edition
                  sheets will be pre-filled; proceed to the asset-type branch.
                </>
              ) : (
                <>
                  <span className="font-semibold">Not found — </span>a new BOOK and
                  BOOK_EDITION record will be created.
                </>
              )}
            </div>
          ) : null}
          <div className="flex gap-3">
            <PrimaryButton
              disabled={!isbn.trim()}
              onClick={() => {
                setExists(!!match);
                setStep(match ? 3 : 1);
              }}
            >
              Submit ISBN
            </PrimaryButton>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="card-surface space-y-4 p-5">
          <h2 className="font-bold">Step 2 — Core info sheet</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm({ ...bookForm, title: e.target.value })
                }
              />
            </Field>
            <Field label="Author(s)">
              <TextInput
                value={bookForm.authors}
                onChange={(e) =>
                  setBookForm({ ...bookForm, authors: e.target.value })
                }
              />
            </Field>
            {/* <Field label="Author(s)">
              <TextInput defaultValue="Colleen Hoover" />
            </Field> */}
            <Field label="Category">
                <SelectInput
                  value={bookForm.category}
                  onChange={(e) =>
                    setBookForm({ ...bookForm, category: e.target.value })
                  }
                > 
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Keywords (comma separated)">
              <TextInput
                value={bookForm.keywords}
                onChange={(e) =>
                  setBookForm({ ...bookForm, keywords: e.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Summary">
            <TextArea
              value={bookForm.summary}
              onChange={(e) =>
                setBookForm({ ...bookForm, summary: e.target.value })
              }
            />
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3 rounded-md border border-dashed border-input p-4">
              <div className="h-16 w-12 rounded bg-[color-mix(in_srgb,var(--primary-green)_18%,white)]" />
              <div className="text-sm text-muted-foreground">
                {/* it_ends_with_us_cover.jpg · 240 KB */}
                Upload an image file
              </div>
              <GhostButton className="ml-auto">Upload</GhostButton>
            </div>
          </Field>
          <NavRow onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      ) : null}

      {step === 2 ? (
        <div className="card-surface space-y-4 p-5">
          <h2 className="font-bold">Step 3 — Edition info sheet</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Edition number">
              <TextInput
                value={bookForm.edition}
                onChange={(e) =>
                  setBookForm({ ...bookForm, edition: e.target.value })
                }
              />
            </Field>
            <Field label="Editor(s)">
              <TextInput defaultValue="Brother Bilo" />
            </Field>
            <Field label="Publisher">
              <TextInput
                value={bookForm.publisher}
                onChange={(e) =>
                  setBookForm({ ...bookForm, publisher: e.target.value })
                }
              />
            </Field>
            <Field label="Publication year">
              <TextInput
                value={bookForm.publicationYear}
                onChange={(e) =>
                  setBookForm({ ...bookForm, publicationYear: e.target.value })
                }
              />
            </Field>
            <Field label="Language">
              <SelectInput
                value={bookForm.language}
                onChange={(e) =>
                  setBookForm({ ...bookForm, language: e.target.value })
                }
              >
                <option>English</option>
                <option>Filipino</option>
                <option>Spanish</option>
              </SelectInput>
            </Field>
            <Field label="Page count">
              <TextInput
                value={bookForm.pages}
                onChange={(e) =>
                  setBookForm({ ...bookForm, pages: e.target.value })
                }
              />
            </Field>
            <Field label="Call number">
              <TextInput
                value={bookForm.callNumber}
                onChange={(e) =>
                  setBookForm({ ...bookForm, callNumber: e.target.value })
                }
              />
            </Field>
            <Field label="Price cost (per unit)">
              <TextInput
                value={bookForm.price}
                onChange={(e) =>
                  setBookForm({ ...bookForm, price: e.target.value })
                }
              />
            </Field>
          </div>
          <NavRow onBack={() => setStep(1)} onNext={() => setStep(3)} />
        </div>
      ) : null}

      {step === 3 ? (
        <div className="card-surface space-y-4 p-5">
          <h2 className="font-bold">
            Step 4 — {assetType} details
            {exists ? " (Book Already Exists — new edition)" : ""}
          </h2>
          {exists ? (
            <p className="rounded-md bg-secondary p-3 text-sm text-secondary-foreground">
              Existing BOOK record reused ({match?.title}). Only the new edition and its
              copies are being inserted.
            </p>
          ) : null}
          <Field label="Asset type">
            <SelectInput
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as "Physical" | "Digital")}
            >
              <option>Physical</option>
              <option>Digital</option>
            </SelectInput>
          </Field>
          {assetType === "Physical" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Quantity received (N)">
                <TextInput
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                />
              </Field>
              <Field label="Format">
                <SelectInput defaultValue="Paperback">
                  <option>Hardcover</option>
                  <option>Paperback</option>
                  <option>Spiral</option>
                </SelectInput>
              </Field>
              <Field label="Location (shelf / rack)">
                <SelectInput defaultValue="Main Library - Shelf B2">
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Copy status (default)">
                <SelectInput defaultValue="Available">
                  <option>Available</option>
                  <option>Reserved</option>
                </SelectInput>
              </Field>
              <Field label="Condition (default)">
                <SelectInput defaultValue="Good">
                  <option>New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </SelectInput>
              </Field>
              <Field label="Replacement cost">
                <TextInput defaultValue="16.99" />
              </Field>
              <Field label="Procurement record (optional)">
                <TextInput defaultValue="PR-2026-FIC-082" />
              </Field>
              <Field label="Accession range (auto)">
                <TextInput readOnly value={`ACC-77${101} – ACC-77${100 + quantity}`} />
              </Field>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Licensed quantity">
                <TextInput defaultValue="1" />
              </Field>
              <Field label="File format">
                <SelectInput defaultValue="PDF">
                  <option>PDF</option>
                  <option>EPUB</option>
                  <option>MOBI</option>
                </SelectInput>
              </Field>
              <Field label="Access URL">
                <TextInput defaultValue="https://ebooks.bai.edu/it-ends-with-us" />
              </Field>
              <Field label="File size (MB)">
                <TextInput defaultValue="18.4" />
              </Field>
              <Field label="Max concurrent users">
                <TextInput defaultValue="6" />
              </Field>
              <Field label="Copyright status">
                <SelectInput defaultValue="Licensed">
                  <option>Licensed</option>
                  <option>Public Domain</option>
                  <option>Open Access</option>
                </SelectInput>
              </Field>
              <Field label="Access restrictions">
                <SelectInput defaultValue="Library network only">
                  <option>Library network only</option>
                  <option>Unrestricted</option>
                </SelectInput>
              </Field>
              <Field label="Procurement record (optional)">
                <TextInput defaultValue="PR-2026-FIC-082" />
              </Field>
            </div>
          )}
          <NavRow onBack={() => setStep(exists ? 0 : 2)} onNext={() => setStep(4)} />
        </div>
      ) : null}

      {step === 4 ? (
        <div className="card-surface space-y-4 p-5">
          <h2 className="font-bold">Step 5 — Review & finalize</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-40 w-28 shrink-0 overflow-hidden rounded-md border bg-[color-mix(in_srgb,var(--primary-green)_18%,white)] shadow-sm">
              {exists && match?.cover ? (
                <img
                  src={match.cover}
                  alt={match.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-muted-foreground">
                  New Entry Preview
                </div>
              )}
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <Field label="Title">
                <TextInput
                  defaultValue={
                    exists ? (match?.title ?? "") : "It Ends with Us"
                  }
                />
              </Field>
              <Field label="Category">
                <TextInput
                  defaultValue={exists ? (match?.category ?? "") : "Science"}
                />
              </Field>
              <Field label="Edition / Year">
                <TextInput defaultValue="1st · 2016" />
              </Field>
              <Field label="Asset type">
                <TextInput readOnly value={assetType} />
              </Field>
              <Field label={assetType === "Physical" ? "Barcodes" : "E-book ID"}>
                <TextInput
                  readOnly
                  value={
                    assetType === "Physical"
                      ? `BC-9021-001 … BC-9021-00${quantity}`
                      : "EB-9021"
                  }
                />
              </Field>
              <Field label={assetType === "Physical" ? "Location" : "Max concurrent"}>
                <TextInput
                  readOnly
                  value={
                    assetType === "Physical"
                      ? "Shelf D Rack 5"
                      : "6"
                  }
                />
              </Field>
            </div>
          </div>
          <div className="flex gap-3">
            <GhostButton onClick={() => setStep(3)}>Back</GhostButton>
            <AccentButton onClick={() => setDone(true)}>Submit & Commit</AccentButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NavRow({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex gap-3">
      <GhostButton onClick={onBack}>Back</GhostButton>
      <PrimaryButton onClick={onNext}>Review & Continue</PrimaryButton>
    </div>
  );
}