import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED

  const formData = await req.formData();

  await supabaseAdmin
    .from("jobs")
    .update({
      title: formData.get("title"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
    })
    .eq("id", id);

  return NextResponse.redirect(
    new URL("/admin/jobs", req.url)
  );
}
