import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await supabase.from("jobs").delete().eq("id", params.id);

  return NextResponse.redirect(new URL("/admin/jobs", req.url));
}