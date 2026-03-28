import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

// GET /api/tranzactii
export async function GET(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = createAdminClient();
    const { data, error } = await sb
      .from("tranzactii")
      .select("*")
      .eq("company_id", companyId)
      .order("data", { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PATCH /api/tranzactii?id=UUID
export async function PATCH(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const body = await req.json();
    const sb = createAdminClient();
    const { error } = await sb
      .from("tranzactii")
      .update({ reconciliat: body.reconciliat })
      .eq("id", id)
      .eq("company_id", companyId);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
