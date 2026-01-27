import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-white">
        <div className="rounded-3xl border border-white/10 bg-neutral-950/70 p-10">
          <h1 className="text-2xl font-semibold">Job not found</h1>
          <p className="mt-2 text-white/60">
            The job you’re trying to edit doesn’t exist or was deleted.
          </p>
          <Link
            href="/admin/jobs"
            className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.05]"
          >
            Back to Jobs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">
              Admin · Jobs
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              Edit <span className="text-orange-500">Job</span>
            </h1>
            <p className="mt-2 text-white/60">
              Update the role details and save changes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/jobs"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.05]"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-neutral-950/70 p-8 shadow-[0_16px_60px_rgba(0,0,0,0.55)]">
          {/* subtle glow */}
          <div className="pointer-events-none absolute" />

          <form
            action={`/admin/jobs/${id}/update`}
            method="post"
            className="space-y-8"
          >
            {/* Top row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-white/70">Job title</label>
                <input
                  name="title"
                  defaultValue={job.title ?? ""}
                  placeholder="e.g. Senior Backend Engineer"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              <div>
                <label className="text-sm text-white/70">Location</label>
                <input
                  name="location"
                  defaultValue={job.location ?? ""}
                  placeholder="e.g. Limassol / Remote"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
  <label className="text-sm text-white/70">Employment model</label>
  <select
    name="type"
    defaultValue={job.type ?? "Full-time"}
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
                <label className="text-sm text-white/70">Slug (optional)</label>
                <input
                  name="slug"
                  defaultValue={job.slug ?? ""}
                  placeholder="e.g. senior-backend-engineer"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                />
                <p className="mt-2 text-xs text-white/45">
                  Used for public job URLs if you support slug routing.
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-white/70">Description</label>
              <textarea
                name="description"
                defaultValue={job.description ?? ""}
                placeholder="Write the role overview, responsibilities, requirements…"
                rows={14}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
              />
              <p className="mt-2 text-xs text-white/45">
                Tip: Use short paragraphs and bullet points for readability.
              </p>
            </div>

            {/* Sticky action bar */}
            <div className="-mx-8 border-t border-white/10 px-8 pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-white/50">
                  Job ID: <span className="text-white/70">{job.id}</span>
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
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Danger zone */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-neutral-950/50 p-8">
          <h3 className="text-lg font-semibold">Danger zone</h3>
          <p className="mt-2 text-white/60">
            Deleting a job is permanent and cannot be undone.
          </p>

          <form action={`/admin/jobs/${id}/delete`} method="post" className="mt-6">
            <button
              className="inline-flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/15"
            >
              Delete job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
