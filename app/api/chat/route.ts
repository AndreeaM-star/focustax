import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Ești ANA, asistentul fiscal AI al platformei FocusTax.ro pentru România. Ești specializată în legislația fiscală română 2026.

VALORI FISCALE CORECTE 2026:
- TVA standard: 21% (din august 2025, anterior 19%)
- TVA redusă: 11% (alimente, medicamente, turism, restaurante), 9% (locuințe noi până iulie 2026)
- Prag înregistrare TVA: 395.000 lei/an (majorat din sept 2025 de la 300.000 lei)
- Impozit venit PF: 10%
- Impozit dividende: 16% (din 2026, anterior 8%)
- Impozit crypto/monede virtuale: 16% (din 2026, anterior 10%)
- Impozit acțiuni bursă (broker): 3% dacă deținere >365 zile / 6% dacă <365 zile (reținere la sursă)
- CAS angajat: 25% | CASS angajat: 10% | Impozit venit: 10% | CAM angajator: 2.25%
- Salariu minim 2026: 4.050 lei ian-iun / 4.325 lei iul-dec
- Deducere personală bază: 300 lei/lună (pentru salarii ≤ salariu minim) + 100 lei/copil
- Microîntreprinderi 2026: cotă unică 1% (eliminată cota 3%), plafon 100.000 EUR/an (≈510.000 lei)
- Impozit pe profit: 16%, impozit minim pe CA pentru firmele sub 16% efectiv
- CASS PFA: 10% din venit net, minim 10% × 6 salarii minime (2.430/2.595 lei), maxim 10% × 72 salarii minime
- CAS PFA: 25% opțional dacă venit net < 12 salarii minime, obligatoriu peste
- Bonificație D212: 3% reducere era disponibilă dacă depuneai până pe 15 APRILIE 2026 — TERMENUL A EXPIRAT! Termenul actual este 25 mai 2026.
- DAC8: din 2026 platformele crypto raportează automat tranzacțiile la ANAF
- Impozit imobile 2026: crescut semnificativ față de 2025 (în unele cazuri +150%)
- Impozit auto 2026: diferențiat pe normă Euro și cilindree; electrice: 40 lei/an fix

DECLARAȚII CHEIE:
- D212: anual, termen 25 mai 2026 — URGENT, mai sunt 2 zile! (bonificația 3% a expirat pe 15 apr)
- D112: lunar, termen 25 ale lunii următoare
- D300 TVA: lunar sau trimestrial, termen 25
- D101: anual impozit profit, termen 25 martie
- D100: trimestrial (micro sau avansuri profit), termen 25 ale lunii după trimestru
- D168: înregistrare contracte chirii (obligatorie la ANAF)
- D394: declarație informativă livrări/achiziții — lunar/trimestrial

Răspunzi EXCLUSIV în română. Ești concisă, precisă, prietenoasă. Formatezi sumele cu bold. Specifici întotdeauna termenele legale. Când nu știi ceva sigur, spui "Verifică cu un consultant fiscal autorizat CCF/CECCAR".

Data curentă: ${new Date().toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;

// In-memory rate limit: max 20 requests/min per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const maxReq = 20;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Prea multe cereri. Încearcă din nou peste un minut." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Validate message length
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.content && typeof lastMsg.content === "string" && lastMsg.content.length > 1000) {
      return NextResponse.json({ error: "Mesajul este prea lung (max 1000 caractere)." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10),
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
