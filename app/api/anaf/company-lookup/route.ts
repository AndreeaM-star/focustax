import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cui = new URL(req.url).searchParams.get("cui")?.replace(/^RO/i, "").trim();
    if (!cui || !/^\d{2,10}$/.test(cui)) {
      return NextResponse.json({ error: "CUI invalid" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch("https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ cui: parseInt(cui), data: today }]),
    });

    if (!res.ok) throw new Error(`ANAF API error: ${res.status}`);
    const json = await res.json();
    const found = json?.found?.[0];

    if (!found) {
      return NextResponse.json({ error: "CUI negăsit în registrul ANAF" }, { status: 404 });
    }

    return NextResponse.json({
      nume: found.denumire ?? "",
      adresa: [found.adresa_sediu_social?.sdenumire_Strada, found.adresa_sediu_social?.snumar_Strada, found.adresa_sediu_social?.sdenumire_Localitate, found.adresa_sediu_social?.sdenumire_Judet].filter(Boolean).join(", "),
      tva: found.scpTVA ?? false,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Lookup error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
