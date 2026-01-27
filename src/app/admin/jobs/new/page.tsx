import Link from "next/link";

export default function NewJobPage() {
  return (
    <section className="bg-black text-white">
      <div className="relative max-w-4xl mx-auto px-6 py-14">
        {/* subtle hero glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-orange-500/6 blur-3xl" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              Admin · Jobs
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
              Create <span className="text-orange-500">New Job</span>
            </h1>
            <p className="mt-2 text-white/60">
              Add a new role and publish it when ready.
            </p>
          </div>

          <Link
            href="/admin/jobs"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.05]"
          >
            Back to Jobs
          </Link>
        </div>

        {/* Form card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-neutral-950/70 p-8 shadow-[0_16px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          {/* subtle grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />
          </div>

          <form
            action="/admin/jobs/new/submit"
            method="post"
            className="relative space-y-8"
          >
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70">Job title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Senior Backend Engineer"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Location</label>
                <input
                  name="location"
                  placeholder="e.g. Limassol / Remote"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70">Model</label>
              <select
  name="type"
  defaultValue="Onsite"
  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
>
  <option className="bg-black" value="Onsite">
    Onsite
  </option>
  <option className="bg-black" value="Hybrid">
    Hybrid
  </option>
  <option className="bg-black" value="Remote">
    Remote
  </option>
</select>

                <p className="mt-2 text-xs text-white/45">
                  Keep “Remote” only if it’s fully remote.
                </p>
              </div>

              <div>
                <label className="text-sm text-white/70">
                  Requirements (comma separated)
                </label>
                <input
                  name="requirements"
                  placeholder="React, TypeScript, Next.js"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
                <p className="mt-2 text-xs text-white/45">
                  Example: “React, TypeScript, APIs”.
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-white/70">Description</label>
              <textarea
                name="description"
                rows={12}
                placeholder="Role overview, responsibilities, requirements, benefits…"
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
              />
              <p className="mt-2 text-xs text-white/45">
                Tip: Use short paragraphs + bullet points for readability.
              </p>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-white/50">
                Make sure the title + location are accurate before publishing.
              </p>

              <div className="flex gap-3">
                <Link
                  href="/admin/jobs"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white hover:bg-white/[0.05]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  Create job
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Optional helper card */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-neutral-950/50 p-8">
          <h3 className="text-lg font-semibold">Formatting tips</h3>
          <p className="mt-2 text-white/60">
            You can paste bullet points in the description. Keep the first 2–3
            lines a strong summary — it improves application quality.
          </p>
        </div>
      </div>
    </section>
  );
}
