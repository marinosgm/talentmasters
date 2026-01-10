import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();

  await supabase
    .from("jobs")
    .update({
      title: formData.get("title"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
    })
    .eq("id", params.id);

  return NextResponse.redirect(new URL("/admin/jobs", req.url));
}