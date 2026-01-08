export default function Home() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Talentmasters
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connecting exceptional talent with outstanding companies.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/jobs"
            className="bg-black text-white px-6 py-3 rounded-md"
          >
            View Jobs
          </a>
          <a
            href="/contact"
            className="border px-6 py-3 rounded-md"
          >
            Hire Talent
          </a>
        </div>
      </div>
    </section>
  );
}