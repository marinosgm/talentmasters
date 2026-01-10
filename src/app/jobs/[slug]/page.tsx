import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ THIS IS THE FIX

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!job || error) {
    notFound();
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/jobs" className="text-sm text-orange-500 hover:underline">
        ← Back to jobs
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-4">
        {job.title}
      </h1>

      <p className="text-white/60 mb-8">
        {job.location} · {job.type}
      </p>

      {job.description && (
        <div className="prose prose-invert max-w-none mb-10">
          <p>{job.description}</p>
        </div>
      )}

      {job.requirements?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Requirements</h3>
          <ul className="list-disc list-inside text-white/70 space-y-2">
            {job.requirements.map((req: string) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={`/jobs/${job.slug}/apply`}
        className="inline-block bg-orange-500 text-black px-8 py-4 rounded-md font-medium hover:bg-orange-400 transition"
      >
        Apply for this position
      </Link>
    </section>
  );
}