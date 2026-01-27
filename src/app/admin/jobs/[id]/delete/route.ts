import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Job not found (nothing deleted)." }, { status: 404 });
  }

  // revalidate all pages that show jobs
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/");

  return NextResponse.redirect(new URL("/admin/jobs", req.url), { status: 303 });
}
