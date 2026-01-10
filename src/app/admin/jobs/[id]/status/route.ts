import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();
  const status = formData.get("status");

  await supabase
    .from("applications")
    .update({ status })
    .eq("id", params.id);

  return NextResponse.redirect(req.headers.get("referer")!);
}