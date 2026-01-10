import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function JobsPage() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, slug, location, type")
    .order("created_at", { ascending: false });

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Open <span className="text-orange-500">Positions</span>
        </h1>
        <p className="text-white/70 max-w-2xl">
          Explore our latest opportunities and find the role that matches your
          skills and ambitions.
        </p>
      </div>

      {!jobs || jobs.length === 0 ? (
        <p className="text-white/60">No open positions at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="border border-white/10 rounded-xl p-6 bg-white/5 hover:border-orange-500 transition block"
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-sm text-white/60">
                {job.location} · {job.type}
              </p>
              <span className="inline-block mt-4 text-orange-500 font-medium">
                View role →
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}