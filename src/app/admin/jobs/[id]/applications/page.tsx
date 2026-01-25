import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1️⃣ Fetch job (get title + slug)
  const { data: job } = await supabaseAdmin
    .from("jobs")
    .select("title, slug")
    .eq("id", id)
    .single();

  if (!job) {
    return <p className="text-white">Job not found</p>;
  }

  // 2️⃣ Fetch applications by slug ✅
  const { data: applications } = await supabaseAdmin
    .from("applications")
    .select(
      "id, full_name, email, phone, cv_url, created_at, status"
    )
    .eq("job_slug", job.slug)
    .order("created_at", { ascending: false });

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">
        Applications —{" "}
        <span className="text-orange-500">{job.title}</span>
      </h1>

      {!applications || applications.length === 0 ? (
        <p className="text-white/60">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 rounded-lg overflow-hidden">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Applied</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">CV</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{app.full_name}</td>
                  <td className="p-4 text-white/70">{app.email}</td>
                  <td className="p-4 text-white/60">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      href={app.cv_url}
                      target="_blank"
                      className="text-orange-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
