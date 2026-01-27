import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function toStr(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = toStr(formData.get("title"));
  const location = toStr(formData.get("location")) || null;
  const type = toStr(formData.get("type")) || null;
  const description = toStr(formData.get("description")) || null;

  const requirementsRaw = toStr(formData.get("requirements"));
  const requirements =
    requirementsRaw.length > 0
      ? requirementsRaw.split(",").map((r) => r.trim()).filter(Boolean)
      : [];

  if (!title) {
    return NextResponse.redirect(new URL("/admin/jobs/new?error=missing_title", req.url), {
      status: 303,
    });
  }

  let slug = slugify(title);

  // avoid slug collision
  const { data: existing } = await supabaseAdmin
    .from("jobs")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 7)}`;

  const { error } = await supabaseAdmin.from("jobs").insert({
    title,
    slug,
    location,
    type,
    description,
    requirements,
  });

  if (error) {
    // Redirect back with error instead of showing a 500 page
    return NextResponse.redirect(
      new URL(`/admin/jobs/new?error=${encodeURIComponent(error.message)}`, req.url),
      { status: 303 }
    );
  }

  // update all pages that show jobs
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/");

  return NextResponse.redirect(new URL("/admin/jobs?created=1", req.url), {
    status: 303,
  });
}
