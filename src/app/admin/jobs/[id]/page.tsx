import { supabase } from "@/lib/supabase-admin";

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", params.id)
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
        action={`/admin/jobs/${params.id}/update`}
        method="post"
        className="space-y-6"
      >
        <input
          name="title"
          defaultValue={job.title}
          className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
        />

        <input
          name="location"
          defaultValue={job.location}
          className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
        />

        <input
          name="type"
          defaultValue={job.type}
          className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
        />

        <textarea
          name="description"
          defaultValue={job.description}
          rows={5}
          className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
        />

        <button className="bg-orange-500 text-black px-8 py-4 rounded-md font-medium hover:bg-orange-400 transition">
          Save Changes
        </button>
      </form>
    </section>
  );
}