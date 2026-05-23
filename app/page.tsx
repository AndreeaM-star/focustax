"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const carduri = [
  {
    icon: "💼",
    titlu: "Impozit pe Venit",
    color: "blue",
    text: "Persoanele fizice plătesc 10% impozit pe venit din activități independente, chirii, dividende și alte surse. Declarația Unică (D212) se depune anual până pe 25 mai.",
    link: "/calculator?tab=pfa",
    linkLabel: "Calculator PFA →",
  },
  {
    icon: "🏢",
    titlu: "Impozit pe Profit",
    color: "green",
    text: "Societățile comerciale plătesc 16% impozit pe profit. Microîntreprinderile plătesc 1% din cifra de afaceri (cotă unică din 2026). Plafonul de încadrare: 100.000 EUR/an.",
    link: "/calculator?tab=firma",
    linkLabel: "Calculator SRL →",
  },
  {
    icon: "🧾",
    titlu: "TVA",
    color: "amber",
    text: "Cota standard de TVA este 21% (din august 2025). Cote reduse: 11% (alimente, restaurante), 9% (locuințe noi). Înregistrarea este obligatorie peste 395.000 lei/an.",
    link: "/declaratii/d300",
    linkLabel: "Declarația D300 →",
  },
  {
    icon: "🛡️",
    titlu: "Contribuții Sociale",
    color: "purple",
    text: "CAS (pensii) 25% și CASS (sănătate) 10% se aplică veniturilor din muncă și activități independente. PFA-urile le declară prin D212.",
    link: "/ghiduri/d212-ghid-completare",
    linkLabel: "Ghid D212 →",
  },
  {
    icon: "📅",
    titlu: "Termene de Plată",
    color: "red",
    text: "Obligațiile fiscale au termene stricte: lunar (TVA, salarii), trimestrial (microîntreprinderi) sau anual (impozit profit, D212). Întârzierile atrag penalități.",
    link: "/calendar",
    linkLabel: "Calendar fiscal →",
  },
  {
    icon: "⚖️",
    titlu: "ANAF & Conformare",
    color: "blue",
    text: "ANAF administrează toate obligațiile fiscale. Declarațiile se depun online prin SPV. Neconformarea atrage amenzi și dobânzi de întârziere.",
    link: "/sisteme",
    linkLabel: "Sisteme ANAF →",
  },
];

const calcPreview = [
  { href: "/calculator", icon: "💼", label: "Calculator Salariu", preview: "6.000 lei brut → ~3.960 lei net" },
  { href: "/calculator?tab=pfa", icon: "🧾", label: "Calculator PFA", preview: "50.000 lei venit → ~36.500 lei net" },
  { href: "/calculator?tab=firma", icon: "🏢", label: "Calculator SRL", preview: "Micro 1% — simplu și rapid" },
  { href: "/calculator?tab=crypto", icon: "₿", label: "Crypto & Investiții", preview: "16% impozit + CASS condiționat" },
  { href: "/calculator/forme-juridice", icon: "⚖️", label: "Compară forme juridice", preview: "Angajat vs PFA vs SRL — vizual" },
];

const deParceFeatures = [
  { icon: "🎯", label: "Gratuit 100%", desc: "Fără cont, fără abonament. Toate calculatoarele sunt libere." },
  { icon: "📅", label: "Actualizat 2026", desc: "TVA 21%, salariu minim 4.325 lei, dividende 16%, micro 1%." },
  { icon: "🔍", label: "Fără jargon", desc: "Explicații clare, în română, fără termeni tehnici inutili." },
];

function d212ZileRamase(): number {
  const termen = new Date(2026, 4, 25); // 25 mai 2026
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((termen.getTime() - azi.getTime()) / 86400000));
}

export default function HomePage() {
  const zile = d212ZileRamase();
  return (
    <>
      <Navbar />
      <main>

        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className={styles.hero}>
          {/* Animated orbs */}
          <div className={styles.orbsContainer} aria-hidden>
            <div className={`${styles.orb} ${styles.orbBlue}`} />
            <div className={`${styles.orb} ${styles.orbPurple}`} />
            <div className={`${styles.orb} ${styles.orbPink}`} />
          </div>

          {/* Grid overlay */}
          <div className={styles.heroGrid} aria-hidden />

          <div className={styles.heroContent}>
            {/* D212 banner */}
            {zile > 0 && (
              <div className={styles.d212Banner}>
                <span className={styles.d212BannerIcon}>⚡</span>
                <span>
                  <strong>URGENT — D212 termen: 25 mai 2026</strong>
                  {" "}— mai {zile === 1 ? "ai o zi" : `ai ${zile} zile`} să depui Declarația Unică pentru veniturile din 2025.{" "}
                  <Link href="/ghiduri/d212-ghid-completare" className={styles.d212BannerLink}>Ghid completare →</Link>
                </span>
              </div>
            )}

            <span className={styles.pill}>Ghid Fiscal România 2026</span>

            <h1 className={styles.heroTitle}>
              Taxele tale,{" "}
              <span className={styles.heroGradient}>Simplificate.</span>
            </h1>

            <p className={styles.heroText}>
              Calculatoare precise, ghiduri clare și toate termenele 2026 — gratuit, fără cont, construit pentru sistemul fiscal din România.
            </p>

            <div className={styles.heroCTA}>
              <Link href="/calculator" className={styles.btnPrimary}>
                <span className={styles.btnShimmer} aria-hidden />
                Calculator Taxe
              </Link>
              <Link href="/declaratii" className={styles.btnSecondary}>
                Declarații →
              </Link>
            </div>

            {/* Stats */}
            <div className={styles.statsStrip}>
              <div className={styles.statCard}>
                <span className={styles.statNum}>10%</span>
                <span className={styles.statLabel}>Impozit venit</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>21%</span>
                <span className={styles.statLabel}>TVA standard</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>25%</span>
                <span className={styles.statLabel}>CAS pensii</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>395k</span>
                <span className={styles.statLabel}>Prag TVA (lei)</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>1%</span>
                <span className={styles.statLabel}>Micro SRL 2026</span>
              </div>
            </div>

            <p className={styles.heroFootnote}>Fără cont necesar · Gratuit</p>
          </div>
        </section>

        {/* ─── DE CE FOCUSTAX ───────────────────────────────── */}
        <section className={styles.whySection}>
          <div className={styles.whyInner}>
            {deParceFeatures.map(f => (
              <div key={f.label} className={styles.whyCard}>
                <span className={styles.whyIcon}>{f.icon}</span>
                <h3 className={styles.whyLabel}>{f.label}</h3>
                <p className={styles.whyDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CALCULATOARE RAPIDE ──────────────────────────── */}
        <section className={styles.calcSection}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Calculatoare rapide</h2>
              <p className={styles.sectionSub}>Alege forma ta juridică și calculează instant impozitele datorate.</p>
            </div>
            <div className={styles.calcGrid}>
              {calcPreview.map(c => (
                <Link key={c.href} href={c.href} className={styles.calcCard}>
                  <span className={styles.calcIcon}>{c.icon}</span>
                  <span className={styles.calcLabel}>{c.label}</span>
                  <span className={styles.calcPreview}>{c.preview}</span>
                  <span className={styles.calcArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SISTEM FISCAL ────────────────────────────────── */}
        <section className={styles.sistemFiscal}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Sistemul fiscal din România</h2>
              <p className={styles.sectionSub}>
                România aplică un sistem fiscal mixt. Principalele obligații sunt gestionate de ANAF.
              </p>
            </div>
            <div className={styles.sistemGrid}>
              {carduri.map((card, i) => (
                <div
                  key={card.titlu}
                  className={`${styles.sistemCard} ${styles[`card_${card.color}`]}`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className={styles.sistemCardIcon}>{card.icon}</div>
                  <h3 className={styles.sistemCardTitle}>{card.titlu}</h3>
                  <p className={styles.sistemCardText}>{card.text}</p>
                  <Link href={card.link} className={styles.sistemCardLink}>{card.linkLabel}</Link>
                </div>
              ))}
            </div>
            <div className={styles.sistemActions}>
              <Link href="/comparatii" className={styles.sistemLink}>🌍 Compară cu Europa</Link>
              <Link href="/calendar" className={styles.sistemLink}>📅 Calendar fiscal 2026</Link>
              <Link href="/ghiduri" className={styles.sistemLink}>📚 Toate ghidurile</Link>
            </div>
          </div>
        </section>

        {/* ─── ANA AI TEASER ────────────────────────────────── */}
        <section className={styles.anaSection}>
          <div className={styles.sectionInner}>
            <div className={styles.anaCard}>
              <div className={styles.anaOrb} aria-hidden />
              <div className={styles.anaContent}>
                <span className={styles.anaBadge}>Inteligență Artificială</span>
                <h2 className={styles.anaTitle}>Întreabă-o pe ANA</h2>
                <p className={styles.anaDesc}>
                  Asistenta ta fiscală AI. Calculează, explică și ghidează — pentru PFA, SRL, salariați și investitori.
                </p>
                <Link href="/manager/ai" className={styles.anaBtn}>
                  <span className={styles.btnShimmer} aria-hidden />
                  Pornește conversația →
                </Link>
              </div>
              <div className={styles.anaChatPreview} aria-hidden>
                <div className={styles.anaMsg}>Cât impozit plătesc pe un dividend de 10.000 lei?</div>
                <div className={`${styles.anaMsg} ${styles.anaMsgBot}`}>La dividende plătești <strong>1.600 lei</strong> impozit (16%) + CASS dacă depășești plafonul anual. Doriți un calcul detaliat?</div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
