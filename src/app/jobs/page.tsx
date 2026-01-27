import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Job = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  type: string | null;
};

type SearchParams = {
  q?: string;
  type?: string;
  location?: string;
};

function uniqueStrings(arr: (string | null | undefined)[]) {
  return Array.from(new Set(arr.filter(Boolean) as string[])).sort();
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = (await searchParams) ?? {};

  const q = (sp.q ?? "").trim();
  const typeFilter = (sp.type ?? "").trim();
  const locationFilter = (sp.location ?? "").trim();

  const { data: jobsRaw } = await supabaseAdmin
    .from("jobs")
    .select("id, title, slug, location, type, created_at")
    .order("created_at", { ascending: false });

  const jobs = (jobsRaw ?? []) as Job[];

  // Filter options
  const typeOptions = uniqueStrings(jobs.map((j) => j.type));
  const locationOptions = uniqueStrings(jobs.map((j) => j.location));

  // Filtering (server-side)
  const filtered = jobs.filter((job) => {
    const matchesQ =
      !q ||
      job.title?.toLowerCase().includes(q.toLowerCase()) ||
      job.location?.toLowerCase().includes(q.toLowerCase()) ||
      job.type?.toLowerCase().includes(q.toLowerCase());

    const matchesType = !typeFilter || job.type === typeFilter;
    const matchesLocation = !locationFilter || job.location === locationFilter;

    return matchesQ && matchesType && matchesLocation;
  });

  const total = jobs.length;

  return (
    <section className="relative px-6 py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[560px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Hero */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Hiring now
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Open <span className="text-orange-500">Positions</span>
            </h1>

            <p className="mt-3 text-white/70">
              Explore our latest roles. Filter by location and type, or search
              by keyword to find the best match.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Total roles</p>
                <p className="mt-1 text-2xl font-semibold">{total}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60">Showing</p>
                <p className="mt-1 text-2xl font-semibold">{filtered.length}</p>
              </div>
              <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-4 sm:block">
                <p className="text-sm text-white/60">Remote-friendly</p>
                <p className="mt-1 text-2xl font-semibold">
                  {jobs.filter((j) =>
                    (j.location || "").toLowerCase().includes("remote")
                  ).length}
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:w-[360px]">
            <h3 className="text-lg font-semibold">Don’t see your role?</h3>
            <p className="mt-1 text-sm text-white/70">
              Send a short intro + CV and we’ll reach out when something fits.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 font-semibold text-black transition hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </div>

        {/* Filters */}
        <form
          className="mb-10 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-12"
          action="/jobs"
          method="get"
        >
          <div className="md:col-span-6">
            <label className="mb-2 block text-sm text-white/70">
              Search
            </label>
            <input
              name="q"
              defaultValue={q}
              placeholder="e.g. Talent Acquisition, Developer, Remote..."
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-orange-500/60"
            />
          </div>

          <div className="md:col-span-3">
            <label className="mb-2 block text-sm text-white/70">
              Type
            </label>
            <select
              name="type"
              defaultValue={typeFilter}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-500/60"
            >
              <option value="">All</option>
              {typeOptions.map((t) => (
                <option key={t} value={t} className="bg-black">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="mb-2 block text-sm text-white/70">
              Location
            </label>
            <select
              name="location"
              defaultValue={locationFilter}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-500/60"
            >
              <option value="">All</option>
              {locationOptions.map((l) => (
                <option key={l} value={l} className="bg-black">
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">
              {q || typeFilter || locationFilter ? (
                <>
                  Showing <span className="text-white">{filtered.length}</span>{" "}
                  result(s) for your filters.
                </>
              ) : (
                <>
                  Showing all <span className="text-white">{total}</span>{" "}
                  open roles.
                </>
              )}
            </p>

            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 font-semibold text-black transition hover:opacity-90"
              >
                Apply filters
              </button>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-white transition hover:border-white/20"
              >
                Reset
              </Link>
            </div>
          </div>
        </form>

        {/* Jobs grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-xl font-semibold">No matching roles</h2>
            <p className="mt-2 text-white/70">
              Try different keywords or reset filters to view all positions.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/jobs"
                className="rounded-xl bg-orange-500 px-4 py-2.5 font-semibold text-black transition hover:opacity-90"
              >
                View all roles
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-white transition hover:border-white/20"
              >
                Contact us
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-500/60"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-orange-500/20 blur-2xl" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {job.title}
                    </h2>
                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                      New
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.location ? (
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                        {job.location}
                      </span>
                    ) : null}
                    {job.type ? (
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                        {job.type}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-orange-500 font-semibold">
                      View role →
                    </span>
                    <span className="text-sm text-white/50 group-hover:text-white/70 transition">
                      See details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
