export default function NewJobPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">
        Create <span className="text-orange-500">New Job</span>
      </h1>

      <form action="/admin/jobs/new/submit" method="post" className="space-y-6">
        <div>
          <label className="block mb-1">Job title</label>
          <input
            name="title"
            required
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            name="location"
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Type</label>
          <select
            name="type"
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Remote</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            rows={5}
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">
            Requirements (comma separated)
          </label>
          <input
            name="requirements"
            placeholder="React, TypeScript, Next.js"
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />
        </div>

        <button className="bg-orange-500 text-black px-8 py-4 rounded-md font-medium hover:bg-orange-400 transition">
          Create Job
        </button>
      </form>
    </section>
  );
}