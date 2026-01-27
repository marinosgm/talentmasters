import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .delete()
    .eq("id", params.id)
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Nothing deleted" }, { status: 404 });

  // ✅ revalidate all pages that show jobs
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/");

  return NextResponse.redirect(new URL("/admin/jobs", req.url), { status: 303 });
}
