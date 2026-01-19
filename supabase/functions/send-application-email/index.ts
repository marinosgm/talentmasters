import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      job_slug,
      full_name,
      email,
      phone,
      cv_url,
    } = await req.json();

    console.log("📩 Sending application email for:", job_slug);

    const { error } = await resend.emails.send({
      from: "Talentmasters <onboarding@resend.dev>",
      to: ["marinoss.gm@gmail.com"], // 👈 change this
      subject: `New job application — ${job_slug}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${job_slug}</p>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p>
          <a href="${cv_url}" target="_blank">
            Download CV
          </a>
        </p>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return new Response(
        JSON.stringify({ error }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("❌ Function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});