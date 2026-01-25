import HomeHero from "@/components/HomeHero";
import JobsPreview from "@/components/JobsPreview";
import Link from "next/link";
import { NoiseBackground } from "@/components/ui/noise-background";

export default function Home() {
  return (
    <div>
      {/* Client component (animations) */}
      <HomeHero />
      
      {/* STATS */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Candidates placed", value: "500+" },
            { label: "Hiring partners", value: "120+" },
            { label: "Avg. time to hire", value: "14 days" },
            { label: "Industries served", value: "10+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-orange-500">
                {stat.value}
              </p>
              <p className="text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="border border-white/10 rounded-xl p-8 bg-white/5">
          <h3 className="text-2xl font-semibold mb-4">
            For <span className="text-orange-500">Companies</span>
          </h3>
          <ul className="space-y-3 text-white/70">
            <li>• Pre-vetted candidates</li>
            <li>• Faster hiring</li>
            <li>• Dedicated recruiters</li>
          </ul>
        </div>

        <div className="border border-white/10 rounded-xl p-8 bg-white/5">
          <h3 className="text-2xl font-semibold mb-4">
            For <span className="text-orange-500">Candidates</span>
          </h3>
          <ul className="space-y-3 text-white/70">
            <li>• Better roles</li>
            <li>• Honest feedback</li>
            <li>• Career guidance</li>
          </ul>
        </div>
      </section>

      {/* 🔥 THIS IS WHERE JobsPreview GOES */}
      
      <JobsPreview />

      {/* FINAL CTA */}
      <section className="border-t border-white/10 text-center py-20">
        <h2 className="text-4xl font-bold mb-6">
          Ready to hire <span className="text-orange-500">great talent</span>?
        </h2>
        <Link
          href="/contact"
          className="bg-orange-500 text-black px-8 py-4 rounded-md font-medium hover:bg-orange-400 transition"
        >
          Talk to us
        </Link>
      </section>
    </div>
  );
}