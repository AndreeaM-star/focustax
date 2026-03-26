"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

interface Message {
  id: string;
  role: "user" | "ana";
  text: string;
  time: string;
}

// ANA's knowledge base — Romanian fiscal Q&A
const knowledge: Array<{ patterns: string[]; response: string }> = [
  {
    patterns: ["d212", "declaratia unica", "declaratia 212", "pfa"],
    response: "**D212 — Declarația Unică** trebuie depusă până pe **25 mai** anual de persoanele fizice cu venituri din activități independente, chirii, dividende sau din străinătate. O depui online prin SPV sau pe e-anaf.ro. Baza de calcul: venitul net estimat × 35% (CAS 25% + CASS 10%) + impozit 10%.",
  },
  {
    patterns: ["d112", "declaratia 112", "salarii", "angajati"],
    response: "**D112** — Declarația privind obligațiile de plată a contribuțiilor sociale se depune lunar până pe **25 ale lunii** pentru luna precedentă. Cuprinde CAS (25%), CASS (10%) și impozitul pe salarii (10%). O pot genera automat pentru tine — mergi la **HR & Salarii** din meniu.",
  },
  {
    patterns: ["tva", "taxa pe valoare", "plafon", "300000", "300k"],
    response: "**TVA România 2026:** Cota standard este **19%** (a crescut de la 19% și rămâne la 19% în 2026). Înregistrare obligatorie când cifra de afaceri depășește **300.000 lei/an**. Cote reduse: 9% (alimente, medicamente, turism) și 5% (cărți, locuințe sociale). Declarația D300 se depune lunar sau trimestrial.",
  },
  {
    patterns: ["efactura", "e-factura", "factura", "anaf", "xml", "transmitere"],
    response: "**e-Factura** este obligatorie din 2024 pentru toți operatorii economici. Termenul de transmitere este **5 zile lucrătoare** de la data emiterii. Facturile se transmit în format XML UBL 2.1. Sistemul meu le trimite automat și primești răspunsul ANAF în timp real. Mergi la **e-Factura** să emiți una acum.",
  },
  {
    patterns: ["impozit", "profit", "micro", "microintreprindere", "1%", "3%"],
    response: "**Microîntreprinderi 2026:** Impozit pe venituri de **1%** dacă ai cel puțin 1 angajat și CA ≤ 500.000 EUR, sau **3%** fără angajat. Atenție: nu poți opta dacă activezi în domenii restricționate (consultanță, IT cu plafon special). Alternativa: **impozit pe profit 16%** dacă ești SRL obișnuit.",
  },
  {
    patterns: ["dividend", "dividende", "distributie profit"],
    response: "**Dividende 2026:** Impozit la sursă **8%** (redus de la 10% prin OUG, verifică legislația la zi). Mai ai CASS 10% dacă dividendele depășesc 6 salarii minime brute (≈14.394 lei/an). Dividendele se distribuie după aprobarea bilanțului. Recomand consultarea unui contabil pentru optimizare fiscală.",
  },
  {
    patterns: ["evat", "e-vat", "decont", "decontul"],
    response: "**RO e-VAT** — sistemul ANAF precompletează declarația D300 cu datele din e-Factura. Tu verifici și confirmi sau corectezi discrepanțele. Dacă nu intervii la timp și există diferențe, ANAF poate emite decizii de impunere. Te notific automat dacă detectez discrepanțe — mergi la **e-VAT** din meniu.",
  },
  {
    patterns: ["etransport", "e-transport", "uit", "transport", "marfa"],
    response: "**RO e-Transport** — obligatoriu pentru transportul rutier de bunuri cu risc fiscal ridicat. Se generează un cod **UIT** (Unique Identification Token) înainte de începerea transportului. Sistemul meu îl generează automat din comenzi și se integrează cu GPS-ul flotei tale.",
  },
  {
    patterns: ["spv", "spatiu privat virtual", "mesaje anaf"],
    response: "**SPV (Spațiul Privat Virtual)** este platforma ANAF unde primești notificări, decizii de impunere și alte comunicări oficiale. Ai 2 mesaje noi în SPV — unul legat de confirmarea înregistrării TVA și unul referitor la rambursarea TVA din trimestrul trecut. Vrei să le citesc?",
  },
  {
    patterns: ["profit", "stare firma", "cifra de afaceri", "raport", "situatie"],
    response: "Pe baza datelor din sistemul tău pentru luna Martie 2026:\n- **Cifră de afaceri**: ~149.700 lei\n- **Cheltuieli estimate**: ~106.900 lei\n- **Profit brut**: ~42.800 lei\n- **Impozit estimat** (micro 1%): ~1.497 lei\n\nForecast Aprilie: +12% față de martie, bazat pe comenzile confirmate.",
  },
  {
    patterns: ["cas", "contributii", "pensie", "sanatate", "cass"],
    response: "**Contribuții sociale 2026 (angajat):**\n- CAS (pensie): **25%** din brut\n- CASS (sănătate): **10%** din brut\n- Impozit venit: **10%** din baza impozabilă\n\n**Angajator:**\n- CAM (asigurare muncă): **2.25%** din brut\n\nDeducerile personale: 460 lei + 200 lei/copil (pentru salarii mici).",
  },
  {
    patterns: ["scadenta", "termene", "calendar", "mai", "luna", "25"],
    response: "**Calendar fiscal 2026 — termene apropiate:**\n- **25 Mar**: D300 TVA Februarie, D112 salarii Februarie\n- **25 Apr**: D300 TVA Martie, D112 salarii Martie, avans impozit profit T1\n- **25 Mai**: D212 Declarația Unică (persoane fizice)\n- **25 Iun**: D300 TVA Mai, D112 salarii Mai\n\nVrei să programez remindere automate?",
  },
  {
    patterns: ["hello", "salut", "buna", "buna ziua", "hey", "alo"],
    response: "Bună ziua! Sunt **ANA**, asistentul tău fiscal AI, antrenat pe Codul Fiscal român 2026. Pot să te ajut cu:\n- Informații despre declarații și termene\n- Calcularea taxelor și contribuțiilor\n- Explicarea sistemelor ANAF (e-Factura, e-VAT, SPV)\n- Situația financiară a firmei tale\n\nCe dorești să afli?",
  },
];

const suggestions = [
  "Ce declarații am de depus în mai?",
  "Care e plafonul TVA în 2026?",
  "Cum calculez salariul net?",
  "Ce e e-Factura?",
  "Arată-mi situația financiară",
  "Explică-mi microîntreprindere vs profit",
];

function getAnaResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const kb of knowledge) {
    if (kb.patterns.some((p) => lower.includes(p))) {
      return kb.response;
    }
  }
  return `Am primit întrebarea ta: *"${input}"*\n\nAceasta necesită o analiză mai detaliată a legislației fiscale actuale. Recomand consultarea unui contabil autorizat sau accesarea site-ului ANAF pentru informații oficiale. Pot ajuta cu întrebări despre: declarații (D212, D112, D300), TVA, e-Factura, contribuții sociale, microîntreprinderi, sau situația firmei tale.`;
}

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

const commands = [
  { cmd: "Emite factură nouă", icon: "🧾", href: "/manager/facturi" },
  { cmd: "Deschide HR & Salarii", icon: "👥", href: "/manager/hr" },
  { cmd: "Deschide Open Banking", icon: "🏦", href: "/manager/banci" },
  { cmd: "Raport TVA", icon: "📊", href: "/manager/tva" },
  { cmd: "Dashboard", icon: "📊", href: "/manager" },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "ana",
      text: "Bună! Sunt **ANA**, asistentul tău fiscal AI. Sunt antrenată pe Codul Fiscal român 2026 și știu tot ce ține de declarații, taxe, sisteme ANAF și situația firmei tale. Ce dorești să afli?",
      time: "08:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const now = () =>
    new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.slice(-5).map(m => ({ role: m.role === "ana" ? "assistant" : "user", content: m.text })),
            { role: "user", content: text }
          ]
        }),
      });
      const data = await res.json();

      const anaMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ana",
        text: data.message || "Scuze, am întâmpinat o eroare. Încearcă din nou.",
        time: now(),
      };
      setMessages((prev) => [...prev, anaMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ana",
        text: "Scuze, am întâmpinat o eroare de conexiune. Verifică internetul și încearcă din nou.",
        time: now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.startsWith("/")) setShowCommand(true);
      else send(input);
    }
    if (e.key === "Escape") setShowCommand(false);
  };

  const handleInput = (v: string) => {
    setInput(v);
    setShowCommand(v.startsWith("/"));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.anaAvatar}>A</div>
          <div>
            <h1 className={styles.pageTitle}>ANA — Asistent Fiscal AI</h1>
            <p className={styles.pageSubtitle}>
              Antrenată pe Codul Fiscal România 2026 · Răspunde în timp real
            </p>
          </div>
        </div>
        <div className={styles.onlineBadge}>
          <span className={styles.onlineDot} />
          Online
        </div>
      </div>

      {/* Suggestions */}
      <div className={styles.suggestions}>
        {suggestions.map((s) => (
          <button key={s} className={styles.suggestionBtn} onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${m.role === "user" ? styles.userRow : styles.anaRow}`}
            >
              {m.role === "ana" && (
                <div className={styles.msgAvatar}>A</div>
              )}
              <div className={`${styles.bubble} ${m.role === "user" ? styles.userBubble : styles.anaBubble}`}>
                <span
                  dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                />
                <span className={styles.msgTime}>{m.time}</span>
              </div>
              {m.role === "user" && (
                <div className={styles.userAvatarMsg}>Tu</div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.messageRow} ${styles.anaRow}`}>
              <div className={styles.msgAvatar}>A</div>
              <div className={`${styles.bubble} ${styles.anaBubble} ${styles.typingBubble}`}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Command palette */}
        {showCommand && (
          <div className={styles.commandPalette}>
            <div className={styles.commandHeader}>
              <span>⌨️ Command palette</span>
            </div>
            {commands
              .filter((c) => c.cmd.toLowerCase().includes(input.slice(1).toLowerCase()))
              .map((c) => (
                <a
                  key={c.cmd}
                  href={c.href}
                  className={styles.commandItem}
                  onClick={() => { setInput(""); setShowCommand(false); }}
                >
                  <span>{c.icon}</span>
                  <span>{c.cmd}</span>
                </a>
              ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputHint}>
            Scrie <code>/</code> pentru command palette sau întreabă orice fiscal
          </div>
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.chatInput}
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Întreabă ANA... (Enter pentru a trimite)"
              autoComplete="off"
            />
            <button
              className={styles.sendBtn}
              onClick={() => { if (input.startsWith("/")) setShowCommand(true); else send(input); }}
              disabled={!input.trim() || isTyping}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
