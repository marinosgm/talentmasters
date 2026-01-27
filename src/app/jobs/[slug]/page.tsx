import { supabaseServer } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";

function TypeBadge({ type }: { type?: string | null }) {
  const t = (type || "").toLowerCase();

  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm whitespace-nowrap";

  if (t === "onsite") {
    return (
      <span className={`${base} border-orange-500/25 bg-orange-500/10 text-orange-200`}>
        Onsite
      </span>
    );
  }
  if (t === "hybrid") {
    return (
      <span className={`${base} border-white/15 bg-white/[0.04] text-white/80`}>
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

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: job, error } = await supabaseServer
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!job || error) notFound();

  return (
    <section className="bg-black text-white">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-40 right-[-140px] h-[420px] w-[420px] rounded-full bg-orange-500/6 blur-3xl" />
        </div>

        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-orange-300 transition"
        >
          <span className="text-orange-500">←</span> Back to jobs
        </Link>

        {/* Header card */}
        <div className="relative mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/70 p-5 sm:p-8 md:p-10 shadow-[0_18px_70px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* subtle grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:44px_44px]" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              Open role
            </p>

            {/* better mobile typography */}
            <h1 className="mt-3 text-[clamp(26px,7vw,48px)] font-semibold leading-[1.12]">
              {job.title}
            </h1>

            {/* chips: allow wrap + prevent overflow */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs sm:text-sm text-white/75 truncate">
                {job.location || "—"}
              </span>

              <TypeBadge type={job.type} />

              {job.slug && (
                <span className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs sm:text-sm text-white/60 truncate">
                  /{job.slug}
                </span>
              )}
            </div>

            {/* CTA row: full width on mobile */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                href={`/jobs/${job.slug}/apply`}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-orange-500 px-6 sm:px-7 py-3 text-sm font-semibold text-black shadow-[0_16px_50px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Apply for this position
              </Link>

              {/* WhatsApp instead of /contact */}
              <a
                href={`https://wa.me/35799977941?text=${encodeURIComponent(
                  `Hi! I have a question about the ${job.title} role (${job.location ?? "Location N/A"}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 sm:px-7 py-3 text-sm font-semibold text-white hover:bg-white/[0.06]"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 sm:mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {/* Description */}
            {job.description && (
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/60 p-5 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold">Role overview</h2>
                <div className="mt-3 sm:mt-4 text-white/70 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/60 p-5 sm:p-8">
                <h2 className="text-lg sm:text-xl font-semibold">Requirements</h2>
                <ul className="mt-3 sm:mt-4 space-y-2 text-white/70 text-base sm:text-lg">
                  {job.requirements.map((req: string, idx: number) => (
                    <li key={`${req}-${idx}`} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Side panel */}
          <aside className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/60 p-5 sm:p-8">
              <h3 className="text-base sm:text-lg font-semibold">How to apply</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm sm:text-base">
                Click <span className="text-orange-300 font-semibold">Apply</span> and submit your details.
                If shortlisted, we’ll contact you with next steps.
              </p>

              <Link
                href={`/jobs/${job.slug}/apply`}
                className="mt-5 sm:mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 sm:px-7 py-3 text-sm font-semibold text-black shadow-[0_16px_50px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Apply now
              </Link>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-950/60 p-5 sm:p-8">
              <h3 className="text-base sm:text-lg font-semibold">Note</h3>
              <p className="mt-3 text-white/60 leading-relaxed text-sm sm:text-base">
                We treat all applications with discretion. If you don’t hear back, it simply means
                the role has progressed with other candidates.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
