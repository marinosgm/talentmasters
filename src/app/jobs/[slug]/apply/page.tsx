"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function formatBytes(bytes: number) {
  if (!bytes) return "0B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)}${sizes[i]}`;
}

export default function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = useMemo(
    () => [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) return setError("Please upload your CV.");
    if (!ALLOWED_TYPES.includes(file.type))
      return setError("Only PDF or Word documents are allowed.");
    if (file.size > MAX_FILE_SIZE)
      return setError("File size must be under 5MB.");

    try {
      setLoading(true);

      // 1) Ensure job exists
      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .select("slug")
        .eq("slug", slug)
        .single();

      if (!job || jobError) throw new Error("Job not found.");

      // 2) Upload CV
      const ext = file.name.split(".").pop();
      const filePath = `${slug}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        throw new Error(uploadError.message);
      }

      const publicCvUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cvs/${filePath}`;

      // 3) Insert application
      const { error: insertError } = await supabase.from("applications").insert({
        job_slug: slug,
        full_name: fullName,
        email,
        phone,
        cv_url: publicCvUrl,
        status: "new",
      });

      if (insertError) throw new Error("Failed to submit application.");

      // 4) Trigger email (Edge Function)
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-application-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_slug: slug,
            full_name: fullName,
            email,
            phone,
            cv_url: publicCvUrl,
          }),
        }
      );

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="bg-black text-white">
        <div className="relative max-w-3xl mx-auto px-6 py-20 min-h-[70vh] flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-40 right-[-140px] h-[520px] w-[520px] rounded-full bg-orange-500/6 blur-3xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full rounded-3xl border border-white/10 bg-neutral-950/70 p-10 text-center shadow-[0_18px_70px_rgba(0,0,0,0.7)]"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/15 border border-orange-500/20">
              <span className="text-orange-300 text-xl">✓</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-orange-400">
              Application submitted
            </h1>
            <p className="mt-3 text-white/70 text-lg">
              Thank you for applying. Our team will review your application.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-black shadow-[0_16px_50px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Back to jobs
              </Link>

              <Link
                href={`/jobs/${slug}`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white hover:bg-white/[0.06]"
              >
                View the role
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white">
      <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-24">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-40 right-[-140px] h-[520px] w-[520px] rounded-full bg-orange-500/6 blur-3xl" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href={`/jobs/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-orange-300 transition"
          >
            <span className="text-orange-500">←</span> Back to job
          </Link>

          <div className="mt-8 grid lg:grid-cols-5 gap-6">
            {/* Left info */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-white/10 bg-neutral-950/60 p-8 shadow-[0_14px_60px_rgba(0,0,0,0.6)]">
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                  Application
                </p>

                <h1 className="mt-3 text-3xl font-semibold leading-tight">
                  Apply for this role
                </h1>

                <p className="mt-3 text-white/70 leading-relaxed">
                  Submit your details and upload your CV. If shortlisted, we’ll contact
                  you with next steps.
                </p>

                <div className="mt-6 space-y-3 text-sm text-white/60">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
                    File types: PDF, DOC, DOCX
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
                    Max file size: 5MB
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
                    We treat all applications discreetly
                  </div>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/70 p-8 shadow-[0_18px_70px_rgba(0,0,0,0.7)]">
                {/* subtle grid texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:44px_44px]" />
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-white/70">Full name</label>
                      <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white/70">Email</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Phone (optional)</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+357 ..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
                    />
                  </div>

                  {/* Upload */}
                  <div>
                    <label className="text-sm text-white/70">CV / Resume</label>

                    <label className="mt-2 block cursor-pointer rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-black/40 transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-white">
                            {file ? file.name : "Upload your CV"}
                          </p>
                          <p className="mt-1 text-sm text-white/60">
                            PDF, DOC, or DOCX · up to 5MB
                            {file ? ` · ${formatBytes(file.size)}` : ""}
                          </p>
                        </div>

                        <span className="inline-flex items-center justify-center rounded-full bg-orange-500/15 border border-orange-500/20 px-4 py-2 text-xs font-semibold text-orange-200">
                          Choose file
                        </span>
                      </div>

                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>

                    {file && (
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="mt-2 text-sm text-white/60 hover:text-orange-300 transition"
                      >
                        Remove file
                      </button>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-white/10">
                    <p className="text-sm text-white/50">
                      By submitting, you confirm the details are accurate.
                    </p>

                    <button
                      disabled={loading}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-black shadow-[0_16px_50px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {loading ? "Submitting..." : "Submit application"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Small reassurance */}
              <p className="mt-4 text-xs text-white/45 leading-relaxed">
                We use your information only to evaluate your application and contact you about this role.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
