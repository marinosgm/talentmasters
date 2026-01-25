import { supabaseAdmin } from "@/lib/supabase-admin";

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
    return <div className="p-10 text-white">Job not found</div>;
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">
        Edit <span className="text-orange-500">Job</span>
      </h1>

      <form
        action={`/admin/jobs/${id}/update`}
        method="post"
        className="space-y-6"
      >
        <input name="title" defaultValue={job.title} />
        <input name="location" defaultValue={job.location} />
        <input name="type" defaultValue={job.type} />
        <textarea name="description" defaultValue={job.description} />
        <button>Save</button>
      </form>
    </section>
  );
}
