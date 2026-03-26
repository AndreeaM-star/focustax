import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/angajati?company_id=UUID
export async function GET(req: NextRequest) {
  try {
    const companyId = new URL(req.url).searchParams.get("company_id");
    if (!companyId) return NextResponse.json({ error: "company_id required" }, { status: 400 });

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

// POST /api/angajati — body must include company_id
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const companyId = body.company_id;
    if (!companyId) return NextResponse.json({ error: "company_id required" }, { status: 400 });

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

// DELETE /api/angajati?id=UUID — soft delete
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sb = createAdminClient();
    const { error } = await sb.from("angajati").update({ activ: false }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
