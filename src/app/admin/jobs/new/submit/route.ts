import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();


  const title = String(formData.get("title"));
  const location = String(formData.get("location"));
  const type = String(formData.get("type"));
  const description = String(formData.get("description"));
  const requirementsRaw = String(formData.get("requirements"));

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const requirements = requirementsRaw
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  const { error } = await supabase.from("jobs").insert({
    title,
    slug,
    location,
    type,
    description,
    requirements,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/jobs", req.url));
}