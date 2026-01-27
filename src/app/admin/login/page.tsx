"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1) Sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    // 2) Get user
    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    const user = userRes?.user;

    if (userErr || !user) {
      await supabase.auth.signOut();
      setLoading(false);
      setError(userErr?.message || "Login failed. Please try again.");
      return;
    }

    // 3) Check admins table (so user doesn't get stuck in redirect loop)
    const { data: adminRow, error: adminErr } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminErr) {
      await supabase.auth.signOut();
      setLoading(false);
      setError(adminErr.message);
      return;
    }

    if (!adminRow) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("You are not authorized to access the admin area.");
      return;
    }

    setLoading(false);

    // 4) Hard navigate so middleware sees cookie session immediately
    window.location.href = "/admin/jobs";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.6)] space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Admin <span className="text-orange-500">Login</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to manage jobs and applications.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-sm text-white/70">
            Email
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-orange-500/60"
            />
          </label>

          <label className="block text-sm text-white/70">
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-orange-500/60"
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-center text-xs text-white/40">
          If you can log in but still get redirected, the user must be added to{" "}
          <span className="text-white/60">admins</span> table.
        </p>
      </form>
    </div>
  );
}
