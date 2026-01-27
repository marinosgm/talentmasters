import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";

export default async function AdminJobsPage() {
  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("id, title, slug, location, type, created_at")
    .order("created_at", { ascending: false });

    function TypeBadge({ type }: { type?: string | null }) {
  const t = (type || "").toLowerCase();

  const base =
    "rounded-full border px-3 py-1 text-sm capitalize";

  if (t === "onsite") {
    return (
      <span className={`${base} border-orange-500/25 bg-orange-500/10 text-orange-200`}>
        Onsite
      </span>
    );
  }

  if (t === "hybrid") {
    return (
      <span className={`${base} border-white/15 bg-white/[0.04] text-white/75`}>
        Hybrid
      </span>
    );
  }

  if (t === "remote") {
    return (
      <span className={`${base} border-emerald-500/25 bg-emerald-500/10 text-emerald-200`}>
        Remote
      </span>
    );
  }

  return (
    <span className={`${base} border-white/10 bg-white/[0.03] text-white/60`}>
      —
    </span>
  );
}


  return (
    <section className="bg-black text-white">
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* subtle hero glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              Admin
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
              Jobs <span className="text-orange-500">Dashboard</span>
            </h1>
            <p className="mt-2 text-white/60">
              Manage listings, applications, and publishing.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              + New Job
            </Link>

            <form action="/admin/logout" method="post">
              <button className="text-sm text-white/60 hover:text-orange-500">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Empty state */}
        {!jobs || jobs.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-neutral-950/70 p-10">
            <h2 className="text-xl font-semibold">No jobs yet</h2>
            <p className="mt-2 text-white/60">
              Create your first listing to start receiving applications.
            </p>
            <Link
              href="/admin/jobs/new"
              className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.05]"
            >
              Create a job
            </Link>
          </div>
        ) : (
          <>
            {/* Top summary row */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-white/60">
                Total jobs:{" "}
                <span className="text-white font-semibold">{jobs.length}</span>
              </p>
            </div>

            {/* Job list */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group rounded-2xl border border-white/10 bg-neutral-950/70 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_70px_rgba(0,0,0,0.75)]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-lg font-semibold truncate">
                        {job.title}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
    {job.location || "—"}
  </span>

  <TypeBadge type={job.type} />

  {job.slug && (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
      /{job.slug}
    </span>
  )}
</div>

                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.25)]"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/jobs/${job.id}/applications`}
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-sm font-semibold text-white hover:bg-white/[0.05]"
                      >
                        Applications
                      </Link>

                      <form
                        action={`/admin/jobs/${job.id}/delete`}
                        method="post"
                      >
                        <button className="inline-flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/15">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
