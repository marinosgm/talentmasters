"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

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

      /* 1️⃣ Ensure job exists */
      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .select("slug")
        .eq("slug", slug)
        .single();

      if (!job || jobError) throw new Error("Job not found.");

      /* 2️⃣ Upload CV */
      const ext = file.name.split(".").pop();
      const filePath = `${slug}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, file);

      if (uploadError) throw new Error("CV upload failed.");

      const publicCvUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cvs/${filePath}`;

      /* 3️⃣ Insert application */
      const { error: insertError } = await supabase
        .from("applications")
        .insert({
          job_slug: slug,
          full_name: fullName,
          email,
          phone,
          cv_url: publicCvUrl,
          status: "new",
        });

      if (insertError) throw new Error("Failed to submit application.");

      /* 4️⃣ Trigger email (Edge Function) */
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-application-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4 text-orange-500">
            Application submitted 🎉
          </h1>
          <p className="text-white/70 mb-8">
            Thank you for applying. Our team will review your application.
          </p>
          <Link
            href="/jobs"
            className="bg-orange-500 text-black px-6 py-3 rounded-md font-medium"
          >
            Back to jobs
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-6 py-20 max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href={`/jobs/${slug}`} className="text-sm text-orange-500">
          ← Back to job
        </Link>

        <h1 className="text-3xl font-bold mt-6 mb-6">Apply for this role</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black border border-white/20 px-4 py-3 rounded-md"
          />

          <label className="block border border-white/20 px-4 py-3 rounded-md cursor-pointer">
            {file ? file.name : "Upload CV"}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-black py-4 rounded-md"
          >
            {loading ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}