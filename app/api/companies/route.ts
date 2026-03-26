import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/companies — list all
export async function GET() {
  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/companies — create new
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sb = createAdminClient();

    const { data, error } = await sb
      .from("companies")
      .insert({
        nume: body.nume,
        cui: body.cui,
        forma_juridica: body.forma_juridica ?? "SRL",
        capital_social: body.capital_social ?? null,
        adresa: body.adresa ?? "",
        telefon: body.telefon ?? "",
        email: body.email ?? "",
        banca_principala: body.banca_principala ?? "",
        iban: body.iban ?? "",
        contact_nume: body.contact_nume ?? "",
        contact_telefon: body.contact_telefon ?? "",
        contact_email: body.contact_email ?? "",
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
