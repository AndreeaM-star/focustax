import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { salariuMinim, salariuMinimAnual, plafonTvaIncasare, COTE, PLAFOANE, fmtLei } from "@/lib/fiscal";
import { urmatoareleTermene, formatData } from "@/lib/calendar";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function buildSystemPrompt(): string {
  const azi = new Date();
  const an = azi.getFullYear();
  const smin = salariuMinim(azi);
  const sAn = salariuMinimAnual(an);
  const termene = urmatoareleTermene(azi, 6).map((t) => `- ${t.cod}: ${t.titlu} — ${formatData(t.data)}`).join("\n");

  return `Ești ANA, asistentul fiscal AI al platformei FocusTax.ro pentru România. Răspunzi pe baza legislației fiscale în vigoare.

VALORI FISCALE ${an}:
- Salariu minim brut în vigoare: ${fmtLei(smin)} lei (4.050 lei ian–iun 2026, 4.325 lei din 1 iulie 2026). Salariul minim pentru 2027 nu era stabilit în octombrie 2026.
- Salariu: CAS 25%, CASS 10%, impozit 10%, CAM angajator 2,25%. Net la salariul minim: 2.574 lei (S1 2026) / 2.699 lei (S2 2026).
- Suma neimpozabilă la salariul minim: 300 lei/lună (ian–iun 2026, brut ≤ 4.300), 200 lei/lună (iul–dec 2026, brut ≤ 4.600).
- Deducere personală: pentru brut ≤ salariu minim + 2.000 lei; 20%/25%/30%/35%/45% din salariul minim pentru 0/1/2/3/4+ persoane în întreținere, scade cu 0,5 pp la fiecare 50 lei peste salariul minim. +100 lei/copil la școală, +15% din salariul minim pentru tineri sub 26 de ani.
- PFA: pragurile folosesc salariul minim de la 1 ianuarie (${fmtLei(sAn)} lei pentru ${an}). CAS 25% obligatoriu peste 12 salarii minime (${fmtLei(12 * sAn)} lei), la baza fixă de 12 sau 24 salarii minime. CASS 10% pe venitul net, între 6 și 72 salarii minime (${fmtLei(6 * sAn)}–${fmtLei(72 * sAn)} lei). Impozit 10% din venitul net minus CAS și CASS.
- Venituri pasive (dividende, chirii, investiții, crypto): CASS la bază fixă de 6/12/24 salarii minime (${fmtLei(0.6 * sAn)} / ${fmtLei(1.2 * sAn)} / ${fmtLei(2.4 * sAn)} lei), dacă totalul depășește 6 salarii minime.
- Dividende: 16% pentru dividendele distribuite din 2026 (10% în 2025). Crypto: 16% din 2026. Bursă prin broker român: 3% (>365 zile) / 6% (<365 zile), reținut la sursă.
- Chirii: deducere forfetară 20%, impozit 10% pe venitul net.
- TVA: ${COTE.TVA_STANDARD * 100}% standard, ${COTE.TVA_REDUSA * 100}% cotă redusă unică (cota de 5% eliminată din aug. 2025; 9% la locuințe a expirat la 30.09.2026). Plafon înregistrare: ${fmtLei(PLAFOANE.TVA_INREGISTRARE)} lei. TVA la încasare: plafon ${fmtLei(plafonTvaIncasare(an))} lei.
- Microîntreprinderi: 1% din venituri, plafon 100.000 EUR, minim un salariat. Impozit pe profit: 16%. IMCA (0,5%) doar pentru CA > 50 mil. EUR, eliminat din 2027.
- Facilitățile pentru IT, construcții și agricultură au fost eliminate de la 1 ianuarie 2025.
- CAEN Rev. 3: actualizare până la 1 aprilie 2027 (HG 788/2026). Conturi de economii și investiții (CEI): Legea 202/2026, din 2027.

TERMENE:
- D212 (Declarația unică): 25 mai a anului următor veniturilor.
- D112: lunar, 25. D300: lunar/trimestrial, 25. D394: 30 ale lunii următoare. D100 micro/profit: trimestrial, 25.
- D101 pentru 2025 și impozitul micro pe T4 2025: 25 iunie 2026; din 2027 revin la 25 martie, respectiv 25 ianuarie.
- Termenele care cad în weekend sau sărbătoare se mută pe prima zi lucrătoare.
Următoarele termene:
${termene}

Răspunzi EXCLUSIV în română. Ești concisă, precisă, prietenoasă. Formatezi sumele cu bold. Specifici termenele legale. Când nu ești sigură, spui "Verifică cu un consultant fiscal autorizat sau cu un expert contabil".

Data curentă: ${azi.toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;
}

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
        { role: "system", content: buildSystemPrompt() },
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
