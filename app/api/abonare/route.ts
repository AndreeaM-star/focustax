import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { PROFILE } from "@/lib/calendar";

const PROFILE_VALIDE = new Set<string>(PROFILE.map((p) => p.id));
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

// Limită simplă în memorie: max 5 abonări / 10 minute / IP
const incercari = new Map<string, { n: number; pana: number }>();
function permis(ip: string) {
  const acum = Date.now();
  const e = incercari.get(ip);
  if (!e || acum > e.pana) { incercari.set(ip, { n: 1, pana: acum + 600_000 }); return true; }
  if (e.n >= 5) return false;
  e.n++;
  return true;
}

/** Abonare la alertele fiscale: { email, profile: string[], acord: true, sursa? } */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "necunoscut";
  if (!permis(ip)) return NextResponse.json({ error: "Prea multe încercări. Revino mai târziu." }, { status: 429 });

  let body: { email?: unknown; profile?: unknown; acord?: unknown; sursa?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 }); }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Adresa de e-mail nu pare validă." }, { status: 400 });
  if (body.acord !== true) return NextResponse.json({ error: "Avem nevoie de acordul tău ca să îți trimitem e-mailuri." }, { status: 400 });

  const profile = Array.isArray(body.profile) ? body.profile.map(String).filter((p) => PROFILE_VALIDE.has(p)) : [];
  const sursa = typeof body.sursa === "string" ? body.sursa.slice(0, 60) : null;

  try {
    const db = createAdminClient();
    const { error } = await db.from("abonati_alerte").upsert(
      { email, profile, sursa, consimtamant_la: new Date().toISOString(), dezabonat_la: null },
      { onConflict: "email" }
    );
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/abonare]", err);
    return NextResponse.json({ error: "Nu am putut salva abonarea. Încearcă din nou." }, { status: 500 });
  }
}

/** Dezabonare prin linkul din e-mail: /api/abonare?dezabonare=<token> */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("dezabonare") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(token)) return NextResponse.redirect(new URL("/dezabonare/?stare=eroare", req.url));
  try {
    const db = createAdminClient();
    await db.from("abonati_alerte").update({ dezabonat_la: new Date().toISOString() }).eq("token_dezabonare", token);
    return NextResponse.redirect(new URL("/dezabonare/?stare=ok", req.url));
  } catch {
    return NextResponse.redirect(new URL("/dezabonare/?stare=eroare", req.url));
  }
}
