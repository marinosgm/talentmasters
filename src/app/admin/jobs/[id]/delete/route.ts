import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED in Next.js 15

  await supabaseAdmin
    .from("jobs")
    .delete()
    .eq("id", id);

  return NextResponse.redirect(new URL("/admin/jobs", req.url));
}
