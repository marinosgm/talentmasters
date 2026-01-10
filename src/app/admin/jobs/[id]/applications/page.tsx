import { supabase } from "@/lib/supabase-admin";

export default async function JobApplicationsPage({
  params,
}: {
  params: { id: string };
}) {
  // 1️⃣ Fetch job
  const { data: job } = await supabase
    .from("jobs")
    .select("title")
    .eq("id", params.id)
    .single();

  // 2️⃣ Fetch applications
  const { data: applications } = await supabase
    .from("applications")
    .select("id, name, email, cv_url, created_at, status")
    .eq("job_id", params.id)
    .order("created_at", { ascending: false });

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">
        Applications —{" "}
        <span className="text-orange-500">{job?.title}</span>
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
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  {/* Name */}
                  <td className="p-4 font-medium">{app.name}</td>

                  {/* Email */}
                  <td className="p-4 text-white/70">{app.email}</td>

                  {/* Date */}
                  <td className="p-4 text-white/60">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>

                  {/* Status badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${
                          app.status === "new"
                            ? "bg-blue-500/20 text-blue-400"
                            : app.status === "reviewed"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : app.status === "shortlisted"
                            ? "bg-purple-500/20 text-purple-400"
                            : app.status === "hired"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* CV */}
                  <td className="p-4">
                    <a
                      href={app.cv_url}
                      target="_blank"
                      className="text-orange-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-xs">
                      {["reviewed", "shortlisted", "rejected", "hired"].map(
                        (status) => (
                          <form
                            key={status}
                            action={`/admin/applications/${app.id}/status`}
                            method="post"
                          >
                            <input
                              type="hidden"
                              name="status"
                              value={status}
                            />
                            <button
                              className={`hover:underline ${
                                status === "reviewed"
                                  ? "text-yellow-400"
                                  : status === "shortlisted"
                                  ? "text-purple-400"
                                  : status === "hired"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              Mark {status}
                            </button>
                          </form>
                        )
                      )}
                    </div>
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