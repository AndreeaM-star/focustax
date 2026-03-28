import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function verifySession(req: NextRequest): Promise<string | null> {
  const token =
    req.headers.get("x-session-token") ??
    req.cookies.get("focustax_session")?.value;
  if (!token) return null;

  const sb = createAdminClient();
  const { data } = await sb
    .from("sessions")
    .select("company_id, expires_at")
    .eq("session_token", token)
    .single();

  if (!data || new Date(data.expires_at) < new Date()) return null;
  return data.company_id;
}
