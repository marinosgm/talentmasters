import HomeHero from "@/components/HomeHero";
import JobsPreview from "@/components/JobsPreview";
import Link from "next/link";

const STATS = [
  { label: "Candidates placed", value: "1000+" },
  { label: "Hiring partners", value: "70+" },
  { label: "Avg. time to hire", value: "14 days" },
  { label: "Industries served", value: "10+" },
];

const COMPANY_POINTS = [
  {
    title: "Pre-vetted shortlists",
    text: "Senior screening, calibrated to your business phase.",
  },
  { title: "Speed without shortcuts", text: "Fast cycles with discipline, not volume." },
  { title: "Operator-led execution", text: "We run the process end-to-end with discretion." },
];

const CANDIDATE_POINTS = [
  { title: "Better roles", text: "High-signal opportunities aligned to your trajectory." },
  { title: "Honest feedback", text: "Direct, useful insights — no vague rejections." },
  { title: "Career guidance", text: "Positioning, negotiation, and next-step strategy." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
      {children}
    </div>
  );
}

function GlowCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10",
        "bg-neutral-950/70 backdrop-blur-xl", // removed fixed padding
        "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_70px_rgba(0,0,0,0.75)]",
        className,
      ].join(" ")}
    >
      {/* Ambient orange glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/8 blur-3xl" />
      </div>

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Client component (animations) */}
      <HomeHero />

{/* STATS */}
<section className="relative overflow-hidden border-t border-white/10">
  {/* Background glow (not cropped) */}
  <div className="pointer-events-none absolute inset-0">
    {/* main glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.16),transparent_62%)]" />
    {/* soft fade into next section */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-28">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat) => (
        <GlowCard key={stat.label} className="p-4 sm:p-6">
          <p className="text-[clamp(22px,6vw,34px)] font-semibold text-orange-500">
            {stat.value}
          </p>
          <p className="text-white/60 mt-2 text-sm sm:text-base">
            {stat.label}
          </p>
        </GlowCard>
      ))}
    </div>
  </div>
</section>



      {/* VALUE PROPS (BENTO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col gap-6">
          <SectionLabel>WHO WE SERVE</SectionLabel>

          <h2 className="text-[clamp(28px,6.5vw,40px)] font-medium max-w-3xl leading-tight">
            Two-sided execution. One standard:{" "}
            <span className="text-orange-500">quality.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg max-w-3xl">
            We support companies with precision hiring and candidates with
            high-signal career outcomes — with discretion on both sides.
          </p>
        </div>

        {/* IMPORTANT: no fixed auto-rows on mobile */}
        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-4 md:auto-rows-[220px]">
          {/* Companies (big) */}
          <GlowCard className="md:col-span-2 md:row-span-2 p-5 sm:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3">
              For Companies
            </p>
            <h3 className="text-[clamp(20px,5.5vw,28px)] font-medium mb-5 sm:mb-6">
              Senior search delivery, without the agency noise.
            </h3>

            <div className="space-y-4 sm:space-y-5 text-white/70">
              {COMPANY_POINTS.map((p) => (
                <div key={p.title}>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {p.title}
                  </p>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <Link
                href="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Explore services
              </Link>
            </div>
          </GlowCard>

          {/* Candidates (big) */}
          <GlowCard className="md:col-span-2 md:row-span-2 p-5 sm:p-8">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-3">
              For Candidates
            </p>
            <h3 className="text-[clamp(20px,5.5vw,28px)] font-medium mb-5 sm:mb-6">
              Opportunities with clarity, not generic outreach.
            </h3>

            <div className="space-y-4 sm:space-y-5 text-white/70">
              {CANDIDATE_POINTS.map((p) => (
                <div key={p.title}>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {p.title}
                  </p>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <Link
                href="/jobs"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all hover:bg-white/[0.05] active:scale-[0.99]"
              >
                View open roles
              </Link>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* JOBS PREVIEW */}
<section className="border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-10">
      <div>
        <SectionLabel>OPEN ROLES</SectionLabel>

        <h2 className="mt-4 sm:mt-6 text-[clamp(24px,6vw,40px)] font-medium leading-tight">
          Current opportunities
        </h2>

        <p className="mt-3 text-white/60 text-sm sm:text-lg max-w-2xl">
          A curated set of roles where impact and fit matter more than volume.
        </p>
      </div>

      <Link
        href="/jobs"
        className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
      >
        View all roles →
      </Link>
    </div>

    {/* Content */}
    <GlowCard className="p-0">
      <div className="p-4 sm:p-8">
        <JobsPreview />
      </div>
    </GlowCard>


  </div>
</section>


      {/* FINAL CTA */}
      <section className="relative border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.10),transparent_65%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <GlowCard className="p-6 sm:p-10">
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-white/50">
              DISCRETION. SPEED. SENIORITY.
            </p>

            <h2 className="mt-4 text-[clamp(26px,6.5vw,42px)] font-semibold leading-tight max-w-3xl">
              Ready to hire <span className="text-orange-500">great talent</span>?
            </h2>

            <p className="mt-4 text-white/60 text-base sm:text-lg max-w-3xl">
              Engage us when the cost of getting it wrong is too high.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://wa.me/35797678927?text=Hi%20I%27d%20like%20to%20discuss%20hiring"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Talk to us on WhatsApp
              </a>

              <Link
                href="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/[0.05] active:scale-[0.99]"
              >
                View services
              </Link>
            </div>
          </GlowCard>
        </div>
      </section>
    </div>
  );
}
