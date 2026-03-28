import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cui = new URL(req.url).searchParams.get("cui")?.replace(/^RO/i, "").trim();
    if (!cui || !/^\d{2,10}$/.test(cui)) {
      return NextResponse.json({ error: "CUI invalid" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let res: Response;
    try {
      res = await fetch("https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify([{ cui: parseInt(cui), data: today }]),
        signal: controller.signal,
        cache: "no-store",
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!res.ok) {
      return NextResponse.json({ error: `ANAF API: ${res.status} ${res.statusText}` }, { status: 502 });
    }

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
  } catch {
    return NextResponse.json(
      { error: "Serviciul ANAF nu este disponibil momentan. Completează manual datele firmei." },
      { status: 503 }
    );
  }
}
