import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  type: string | null;
};

export default async function JobsPreview() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, slug, location, type")
    .order("created_at", { ascending: false })
    .limit(3);

  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Latest <span className="text-orange-500">Jobs</span>
          </h2>
          <p className="text-white/60">
            Explore our most recent opportunities.
          </p>
        </div>

        <Link
          href="/jobs"
          className="text-orange-500 hover:underline hidden md:block"
        >
          View all jobs →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job: Job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.slug}`}
            className="group border border-white/10 rounded-xl p-6 bg-white/5 hover:border-orange-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition">
              {job.title}
            </h3>
            <p className="text-sm text-white/60">
              {job.location ?? "Remote"} · {job.type ?? "Full-time"}
            </p>

            <p className="mt-4 text-orange-500 text-sm font-medium">
              View role →
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10 md:hidden">
        <Link
          href="/jobs"
          className="inline-block text-orange-500 hover:underline"
        >
          View all jobs →
        </Link>
      </div>
    </section>
  );
}