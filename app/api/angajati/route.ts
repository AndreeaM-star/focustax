import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

// GET /api/angajati
export async function GET(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sb = createAdminClient();
    const { data, error } = await sb
      .from("angajati")
      .select("*")
      .eq("company_id", companyId)
      .eq("activ", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/angajati
export async function POST(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("angajati")
      .insert({
        company_id: companyId,
        nume: body.nume,
        functie: body.functie,
        brut_lunar: body.brutLunar,
        data_angajare: body.dataAngajare ?? null,
        nr_copii: body.nrCopii ?? 0,
        pontaj: body.pontaj ?? 21,
        activ: true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/angajati?id=UUID
export async function DELETE(req: NextRequest) {
  try {
    const companyId = await verifySession(req);
    if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sb = createAdminClient();
    const { error } = await sb
      .from("angajati")
      .update({ activ: false })
      .eq("id", id)
      .eq("company_id", companyId);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
