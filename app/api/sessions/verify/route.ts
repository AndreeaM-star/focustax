import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { session_token } = await req.json();
    if (!session_token) return NextResponse.json({ error: "token required" }, { status: 400 });

    const sb = createAdminClient();
    const { data } = await sb
      .from("sessions")
      .select("company_id, expires_at, companies(nume, cui)")
      .eq("session_token", session_token)
      .single();

    if (!data || new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: "Token invalid sau expirat" }, { status: 401 });
    }

    const company = data.companies as unknown as { nume: string; cui: string } | null;
    return NextResponse.json({
      company_id: data.company_id,
      company_name: company?.nume ?? "",
      company_cui: company?.cui ?? "",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
