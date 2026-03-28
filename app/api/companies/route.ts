import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

const DEMO_WORDS = ["demo", "test", "exemplu", "sample", "fictiv", "temp"];

function isDemoName(name: string) {
  const n = (name ?? "").toLowerCase();
  return DEMO_WORDS.some((w) => n.includes(w));
}

const CUI_REGEX = /^(RO)?\d{2,10}$/i;

// GET /api/companies — list all
export async function GET() {
  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET companies error:", error);
      return NextResponse.json({ error: error.message ?? "DB error" }, { status: 500 });
    }
    return NextResponse.json(data ?? []);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/companies — create new
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate name
    if (!body.nume?.trim()) {
      return NextResponse.json({ error: "Numele companiei este obligatoriu" }, { status: 400 });
    }
    if (isDemoName(body.nume)) {
      return NextResponse.json({ error: "Numele companiei nu poate conține cuvinte rezervate (demo, test, fictiv etc.)" }, { status: 400 });
    }

    // Validate CUI
    const cui = (body.cui ?? "").trim().toUpperCase();
    if (!cui || !CUI_REGEX.test(cui)) {
      return NextResponse.json({ error: "CUI invalid. Format acceptat: RO12345678 sau 12345678 (2-10 cifre)" }, { status: 400 });
    }

    const sb = createAdminClient();

    // Check if CUI already exists
    const { data: existing } = await sb
      .from("companies")
      .select("*")
      .eq("cui", cui)
      .single();

    if (existing) {
      // Create new session for existing company
      const { data: session } = await sb
        .from("sessions")
        .insert({ company_id: existing.id })
        .select("session_token")
        .single();
      return NextResponse.json(
        { ...existing, session_token: session?.session_token ?? null },
        { status: 200 }
      );
    }

    const { data: company, error } = await sb
      .from("companies")
      .insert({
        nume: body.nume.trim(),
        cui,
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

    if (error) {
      console.error("Supabase insert company error:", error);
      return NextResponse.json({ error: error.message ?? error.code ?? "DB error" }, { status: 500 });
    }

    // Create session for new company
    const { data: session, error: sessionError } = await sb
      .from("sessions")
      .insert({ company_id: company.id })
      .select("session_token")
      .single();

    if (sessionError) {
      console.error("Session create error:", sessionError);
      // Still return company, just without session token
      return NextResponse.json(company, { status: 201 });
    }

    return NextResponse.json({ ...company, session_token: session.session_token }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("POST /api/companies threw:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
