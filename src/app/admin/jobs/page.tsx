import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";

export default async function AdminJobsPage() {
  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("id, title, slug, location, type")
    .order("created_at", { ascending: false });

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-10">
  <h1 className="text-3xl font-bold">
    Admin <span className="text-orange-500">Jobs</span>
  </h1>

  <div className="flex items-center gap-6">
    <Link
      href="/admin/jobs/new"
      className="bg-orange-500 text-black px-6 py-3 rounded-md font-medium"
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

      {!jobs || jobs.length === 0 ? (
        <p className="text-white/60">No jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-white/10 rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-white/60">
                  {job.location} · {job.type}
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/admin/jobs/${job.id}`}
                  className="text-orange-500 hover:underline"
                >
                  Edit
                </Link>

                <Link
                  href={`/admin/jobs/${job.id}/applications`}
                  className="text-blue-400 hover:underline"
                >
                  Applications
                </Link>

                <form
                  action={`/admin/jobs/${job.id}/delete`}
                  method="post"
                >
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}