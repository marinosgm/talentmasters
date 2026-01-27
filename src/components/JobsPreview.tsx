import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";



type Job = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  type: string | null;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70 whitespace-nowrap">
      {children}
    </span>
  );
}

export default async function JobsPreview() {
  const { data: jobs, error } = await supabaseServer
    .from("jobs")
    .select("id, title, slug, location, type, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    // Optional: fail silently in production UI
    return null;
  }

  if (!jobs || jobs.length === 0) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-[clamp(22px,5.5vw,32px)] font-semibold leading-tight">
            Latest <span className="text-orange-500">Jobs</span>
          </h2>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            Explore our most recent opportunities.
          </p>
        </div>

        <Link
          href="/jobs"
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
        >
          View all jobs →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {jobs.map((job: Job) => {
          const loc = job.location ?? "Remote";
          const type = job.type ?? "Full-time";

          return (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 transition hover:border-orange-500/60"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -top-16 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-orange-500/15 blur-2xl" />
              </div>

              <div className="relative">
                <h3 className="text-lg sm:text-xl font-semibold leading-snug group-hover:text-orange-400 transition">
                  {job.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>{loc}</Pill>
                  <Pill>{type}</Pill>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-orange-500 text-sm font-semibold">
                  View role{" "}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile CTA */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/jobs"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
        >
          View all jobs →
        </Link>
      </div>
    </div>
  );
}
