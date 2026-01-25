"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser"; // ✅ THIS WAS MISSING

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Recovery session ready");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return <p>Password updated successfully. You can now log in.</p>;
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h1>Reset Password</h1>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset} disabled={loading}>
        {loading ? "Updating..." : "Update password"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
