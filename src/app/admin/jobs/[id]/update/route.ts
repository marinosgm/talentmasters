import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const formData = await req.formData();

  const title = String(formData.get("title") || "");
  const location = String(formData.get("location") || "");
  const type = String(formData.get("type") || "Onsite"); // Onsite/Hybrid/Remote
  const description = String(formData.get("description") || "");

  const { error } = await supabaseAdmin
    .from("jobs")
    .update({ title, location, type, description })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ✅ 303 = redirect to GET /admin/jobs (no POST re-submit)
  return NextResponse.redirect(new URL("/admin/jobs", req.url), 303);
}
