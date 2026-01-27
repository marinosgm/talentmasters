"use client";

import React from "react";
import { StrategicStackTypewriter } from "@/components/AutoType";
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

function GlowCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
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

      <div className="relative">{children}</div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="relative my-16">
      <div className="h-px w-full bg-white/10" />
      <div className="absolute left-0 top-1/2 h-px w-48 -translate-y-1/2 bg-orange-500/40 blur-[1px]" />
    </div>
  );
}

export default function AboutPage() {
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

        <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionLabel>ABOUT</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.06, ease: "easeOut" }}
            className="mt-8 text-[clamp(3.5rem,7vw,6rem)] font-semibold leading-tight max-w-5xl"
          >
            The architects of{" "}
            <span className="text-orange-500">high-performance teams</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-10 text-xl text-white/65 max-w-3xl"
          >
            Talent strategy that protects and drives enterprise value.
          </motion.p>

          {/* quick chips */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 0.22 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {["Strategy", "Search", "People Risk", "Org Design"].map((t) => (
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

      {/* ================= BENTO: WHO WE ARE ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col gap-6">
          <SectionLabel>WHO WE ARE</SectionLabel>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-medium"
          >
            About us
          </motion.h2>
        </div>

        <div className="mt-14 grid md:grid-cols-4 gap-6 auto-rows-[220px]">
          {/* Main card */}
          <GlowCard className="md:col-span-2 md:row-span-2 p-8">
            <h3 className="text-3xl font-medium mb-3">
              Strategic talent is not recruitment.
            </h3>

            <p className="text-white/70 leading-relaxed text-lg mb-6 max-w-xl">
              We advise CEOs, Boards, and Investors on the people decisions that
              determine commercial success. Operating at the intersection of
              organizational design and executive search, we solve complex
              talent problems that standard recruitment agencies are not
              equipped to handle.
            </p>

            <div className="mt-2">
              <StrategicStackTypewriter />
            </div>
          </GlowCard>

          {/* Identity */}
          <GlowCard className="p-7">
            <p className="text-sm uppercase tracking-widest text-white/40 mb-3">
              Identity
            </p>
            <h4 className="text-xl font-medium">
              HR practitioners.<br />Executive search veterans.
            </h4>
          </GlowCard>

          {/* Positioning */}
          <GlowCard className="p-7">
            <p className="text-sm uppercase tracking-widest text-white/40 mb-3">
              Positioning
            </p>
            <h4 className="text-xl font-medium">
              Strategy meets operational reality.
            </h4>
          </GlowCard>

          {/* Experience */}
          <GlowCard className="md:col-span-2 p-7">
            <p className="text-white/70 leading-relaxed text-lg">
              We are not career consultants, we are builders. Our background
              spans executive search, HR leadership, and organizational
              excellence. We understand the mechanics of hiring, retaining, and
              aligning people at the highest level.
            </p>
          </GlowCard>
        </div>

        <Divider />
      </div>

      {/* ================= HOW WE WORK ================= */}
      <div className="bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col gap-6">
            <SectionLabel>HOW WE WORK</SectionLabel>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-medium"
            >
              How we work
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white/60 text-lg max-w-3xl"
            >
              A mandate for clarity, speed, and discretion.
            </motion.p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Context over content",
                text:
                  "A candidate’s CV is meaningless without understanding the cultural and operational environment in which they must perform.",
              },
              {
                title: "Risk mitigation",
                text:
                  "Hiring and succession are not administrative tasks, they are balance-sheet risks that demand disciplined decision-making.",
              },
              {
                title: "Planned obsolescence",
                text:
                  "We build capability, install leaders, and design systems, then step away. We create engines, not dependencies.",
              },
            ].map((item) => (
              <GlowCard key={item.title} className="p-8">
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  {item.text}
                </p>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>

      {/* ================= VALUES ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-6">
          <SectionLabel>VALUES</SectionLabel>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-medium"
          >
            What we stand for
          </motion.h2>
        </div>

        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {[
            "Fewer engagements, higher seniority",
            "Discretion over visibility",
            "Precision over volume",
            "Long-term outcomes over short-term wins",
          ].map((text) => (
            <GlowCard key={text} className="p-8">
              <p className="text-lg text-white/70 leading-relaxed">{text}</p>
            </GlowCard>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 text-white/60 text-lg max-w-3xl"
        >
          Our clients engage us when the cost of getting it wrong is simply too
          high.
        </motion.p>
      </div>
    </section>
  );
}
