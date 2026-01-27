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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // ✅ Force a full navigation so middleware sees the cookie session immediately
    window.location.href = "/admin/jobs";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 bg-white/[0.02]"
      >
        <h1 className="text-2xl font-bold text-center">
          Admin <span className="text-orange-500">Login</span>
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full bg-black/40 border border-white/15 px-4 py-3 rounded-md outline-none focus:border-orange-500/60"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full bg-black/40 border border-white/15 px-4 py-3 rounded-md outline-none focus:border-orange-500/60"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-black py-3 rounded-md font-medium hover:bg-orange-400 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Optional: quick debug (remove later) */}
        {process.env.NODE_ENV !== "production" && (
          <p className="text-xs text-white/40 text-center">
            If you still loop back to /admin/login, make sure the user exists in{" "}
            <span className="text-white/70">admins</span> table.
          </p>
        )}
      </form>
    </div>
  );
}
