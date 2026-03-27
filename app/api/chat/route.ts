import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Ești ANA, asistentul fiscal AI al platformei FocusTax Manager pentru Romania. Ești specializată în:

- Legislație fiscală România 2026 (Codul Fiscal, Legea 227/2015, OUG-uri recente)
- Sisteme ANAF: e-Factura (obligatoriu 2024, termen 5 zile), RO e-VAT, RO e-Transport (UIT), SPV
- Declarații: D212 (termen 25 mai), D112 (lunar, termen 25), D300 TVA, D394, D101, D100
- Salarii: CAS 25% angajat, CASS 10% angajat, impozit venit 10%, CAM 2.25% angajator, deducere personală 600 lei/lună (salarii ≤ salariul minim) + 300 lei/copil în întreținere
- TVA: cota standard 19%, cote reduse 9% (alimente, medicamente, turism) și 5% (cărți, locuințe sociale), prag înregistrare 300.000 lei/an
- Microîntreprinderi: 1% (cu angajat, CA ≤ 500.000 EUR), 3% (fără angajat)
- Impozit profit: 16% SRL obișnuit, avansuri trimestriale
- Dividende: impozit 8% la sursă, CASS dacă depășesc 6 salarii minime brute

Răspunzi ÎNTOTDEAUNA în română. Ești concisă și precisă. Formatezi sumele importante cu bold. Dacă există termene legale, le specifici clar. Când menționezi declarații, specifici termenele. Ești prietenoasă și profesionistă.

Data curentă: ${new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // keep last 10 messages for context
      ],
      max_tokens: 800,
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content ?? "Nu am putut genera un răspuns. Încearcă din nou.";

    return NextResponse.json({ message: response });
  } catch (err: unknown) {
    console.error("[/api/chat] Groq error:", err);
    const msg = err instanceof Error ? err.message : "Eroare AI";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
