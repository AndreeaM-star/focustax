import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/companies/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = createAdminClient();
    const { data, error } = await sb.from("companies").select("*").eq("id", id).single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 404 });
  }
}

// PATCH /api/companies/[id] — update company
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const sb = createAdminClient();

    const { data, error } = await sb
      .from("companies")
      .update({
        nume: body.nume,
        cui: body.cui,
        forma_juridica: body.forma_juridica,
        capital_social: body.capital_social ?? null,
        adresa: body.adresa ?? "",
        telefon: body.telefon ?? "",
        email: body.email ?? "",
        banca_principala: body.banca_principala ?? "",
        iban: body.iban ?? "",
        contact_nume: body.contact_nume ?? "",
        contact_telefon: body.contact_telefon ?? "",
        contact_email: body.contact_email ?? "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
