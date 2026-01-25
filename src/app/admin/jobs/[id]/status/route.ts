import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED

  const formData = await req.formData();
  const status = formData.get("status");

  if (typeof status !== "string") {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  await supabaseAdmin
    .from("applications")
    .update({ status })
    .eq("id", id);

  return NextResponse.redirect(
    req.headers.get("referer") || "/admin/jobs"
  );
}
