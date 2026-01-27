"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
      {children}
    </div>
  );
}

function ServiceCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10",
        "bg-neutral-950/70 p-8 backdrop-blur-xl",
        "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
        "transition-shadow duration-300 hover:shadow-[0_18px_70px_rgba(0,0,0,0.75)]",
        className,
      ].join(" ")}
    >
      {/* Ambient gradient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/8 blur-3xl" />
      </div>

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative">
        <h3 className="text-2xl font-medium">{title}</h3>
        {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
        <div className="mt-6 text-white/70 text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="relative my-16">
      {/* base line */}
      <div className="h-px w-full bg-white/10" />

      {/* moving orange sweep */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0) 38%, rgba(249,115,22,0.65) 50%, rgba(249,115,22,0) 62%, transparent 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "0% 50%",
          filter: "blur(0.4px)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{
          duration: 2.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}



export default function ServicesPage() {
  return (
    <section className="bg-black text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <div className="relative">
        {/* Background glows */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,165,0,0.14),transparent_60%)]" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-64 right-[-120px] h-[520px] w-[520px] rounded-full bg-orange-500/6 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionLabel>SERVICES</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.06, ease: "easeOut" }}
            className="mt-8 text-[clamp(3.2rem,6.5vw,5.6rem)] font-semibold leading-tight max-w-5xl"
          >
            Search. Strategy.
            <span className="text-orange-500"> Execution.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-8 text-xl text-white/65 max-w-3xl"
          >
            Senior, discrete advisory across executive search, people
            infrastructure, and organizational risk.
          </motion.p>

          {/* KPI chips */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.22 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              "Board & C-Suite Search",
              "Talent Intelligence",
              "Succession & Risk",
              "Org Design",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <Divider />
        </div>
      </div>

      {/* ================= SEARCH & TALENT INTELLIGENCE ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col gap-6">
          <SectionLabel>SEARCH & TALENT INTELLIGENCE</SectionLabel>

       
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6"
>
          {/* Big bento card */}
          <ServiceCard
            title="Global Executive Search"
            subtitle="Precision hiring for the C-Suite, Board, and mission-critical specialist roles."
            className="md:col-span-2 md:row-span-2"
          >
            <ul className="space-y-4">
              <li>
                <strong className="text-white">Access the invisible market:</strong>{" "}
                We move beyond active job seekers to engage the passive,
                high-performing talent that drives competitor success.
              </li>
              <li>
                <strong className="text-white">Assessment beyond skills:</strong>{" "}
                Our vetting process audits leadership style, cultural adaptability,
                and risk profile, not just technical competence.
              </li>
              <li>
                <strong className="text-white">Search as a discipline:</strong>{" "}
                We reject volume. We run fewer searches with higher seniority,
                ensuring every candidate is calibrated to your specific business phase.
              </li>
            </ul>
          </ServiceCard>

          {/* Side card */}
          <ServiceCard
            title="Executive Market Mapping (Talent Intelligence)"
            subtitle="Data-driven insight before you open the headcount."
          >
            <p>
              We treat talent landscapes as competitive intelligence. We map
              competitor structures, compensation benchmarks, and succession
              pools to give you a clear view of the “addressable market” before
              you commit to a search strategy.
            </p>
          </ServiceCard>
        </div>

        <Divider />
      </div>

      {/* ================= ADVISORY & RISK ================= */}
      <div className="bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col gap-6">
            <SectionLabel>ADVISORY & RISK</SectionLabel>

   
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            <ServiceCard
              title="Board-Level People Risk & Succession Advisory"
              subtitle="Protecting the organization from single points of failure."
            >
              <ul className="space-y-4">
                <li>
                  <strong className="text-white">Continuity Planning:</strong>{" "}
                  We stress-test your current leadership bench to ensure the
                  business survives the sudden departure of key figures.
                </li>
                <li>
                  <strong className="text-white">Founder Dependency:</strong>{" "}
                  We design transition pathways to move organizations from
                  founder-led intuition to scalable executive management.
                </li>
                <li>
                  <strong className="text-white">Governance & Safety:</strong>{" "}
                  We audit reporting lines and decision rights to ensure your
                  structure satisfies investors and minimizes operational risk.
                </li>
              </ul>
            </ServiceCard>

            <ServiceCard
              title="Leadership Alignment & Mediation"
              subtitle="Resolving the friction that stalls performance."
            >
              <p>
                Unresolved conflict at the top creates organizational paralysis.
                We act as neutral, discreet mediators to break deadlocks between
                founders and executives, clarifying swim lanes to restore trust
                and decision flow.
              </p>
            </ServiceCard>

            <ServiceCard
              title="Leadership Consulting & Org Design"
              subtitle="Structuring your people to support your strategy."
            >
              <p>
                We advise on the architecture of your organization during growth
                or restructuring. We define roles, reporting lines, and
                accountability structures, ensuring your “people chart” is an
                engine for business delivery, not a legacy of how things used to be.
              </p>
            </ServiceCard>
          </div>
        </div>
      </div>

      {/* ================= BUILD & TRANSFORM ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-6">
          <SectionLabel>BUILD & TRANSFORM</SectionLabel>

    
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">

          <ServiceCard
            title="Building HR & Talent Functions (Startups/Scale-ups)"
            subtitle="From zero to fully operational."
            className="md:col-span-2 md:row-span-2"
          >
            <ul className="space-y-4">
              <li>
                <strong className="text-white">Interim Leadership:</strong>{" "}
                We act as your fractional Head of Talent to build the infrastructure
                while you focus on product and sales.
              </li>
              <li>
                <strong className="text-white">Tech & Process:</strong>{" "}
                We select and implement the Applicant Tracking Systems (ATS) and
                HRIS that fit your growth stage.
              </li>
              <li>
                <strong className="text-white">The Handover:</strong>{" "}
                We hire your permanent internal HR team, embed the operating rhythm,
                and transfer ownership once the function is stable.
              </li>
            </ul>
          </ServiceCard>

          <ServiceCard
            title="Talent Acquisition Function Restructuring"
            subtitle="Transforming recruitment from admin to advisory."
          >
            <p>
              We redesign underperforming internal recruitment teams. By overhauling
              processes, implementing metrics, and upskilling staff, we shift your
              internal TA function from an order-taking service to a strategic
              business partner that executives respect.
            </p>
          </ServiceCard>

          <ServiceCard
            title="Executive Career & Outplacement Advisory"
            subtitle="Managing sensitive exits with dignity and strategy."
          >
            <p>
              We provide high-touch transition support for departing leaders. This is
              reputation management for both the individual and the firm: ensuring
              departing executives receive strategic career counsel and land well,
              protecting your employer brand in the market.
            </p>
          </ServiceCard>
        </div>

        {/* Bottom CTA card */}
        <div className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-10 shadow-[0_16px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-12 h-64 w-64 rounded-full bg-orange-500/12 blur-3xl" />
              <div className="absolute -bottom-24 right-12 h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-white/50">
                  DISCRETION. SPEED. SENIORITY.
                </p>
                <h3 className="mt-3 text-2xl font-medium">
                  Engage us when the cost of getting it wrong is too high.
                </h3>
                <p className="mt-3 text-white/65 text-lg max-w-2xl">
                  We run fewer engagements with higher seniority, designed for leadership decisions
                  where precision and trust matter more than volume.
                </p>
              </div>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Request a conversation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
