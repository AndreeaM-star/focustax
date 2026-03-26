import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/angajati
export async function GET() {
  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("angajati")
      .select("*")
      .eq("activ", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/angajati — create
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sb = createAdminClient();

    const { data, error } = await sb
      .from("angajati")
      .insert({
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const sb = createAdminClient();
    const { error } = await sb
      .from("angajati")
      .update({ activ: false })
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
