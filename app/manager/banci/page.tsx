"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Tranzactie {
  id: string;
  banca: string;
  tip: "credit" | "debit";
  suma: number;
  descriere?: string;
  reconciliat: boolean;
  factura_ref?: string;
  data: string;
}

const banci = [
  { id: "bt",  name: "Banca Transilvania", iban: "RO49BTRL00001205XXX02001", sold: 145200, currency: "RON", color: "#2563eb", logo: "BT",  tip: "Cont curent" },
  { id: "bcr", name: "BCR",                iban: "RO09RNCB0000000012345001", sold: 92400,  currency: "RON", color: "#dc2626", logo: "BCR", tip: "Cont curent" },
  { id: "rz",  name: "Raiffeisen Bank",    iban: "RO12RZBR0000060011000000", sold: 18750,  currency: "RON", color: "#d97706", logo: "RZ",  tip: "Cont curent" },
  { id: "rev", name: "Revolut Business",   iban: "RO98REVO00000000XXXXXXXX", sold: 47500,  currency: "RON", color: "#7c3aed", logo: "RV",  tip: "Cont curent EUR/RON" },
];

const bancaName: Record<string, string> = { bt: "BT", bcr: "BCR", rz: "Raiffeisen", rev: "Revolut" };

export default function BanciPage() {
  const [tranzactii, setTranzactii] = useState<Tranzactie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanca, setSelectedBanca] = useState<string>("toate");

  useEffect(() => {
    fetch("/api/tranzactii")
      .then((r) => r.json())
      .then((data) => setTranzactii(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleReconciliat = async (t: Tranzactie) => {
    const updated = !t.reconciliat;
    setTranzactii((prev) => prev.map((x) => x.id === t.id ? { ...x, reconciliat: updated } : x));
    await fetch(`/api/tranzactii?id=${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reconciliat: updated }),
    });
  };

  const totalSold = banci.reduce((s, b) => s + b.sold, 0);
  const filtered = selectedBanca === "toate" ? tranzactii : tranzactii.filter((t) => t.banca === selectedBanca);
  const reconciliate = tranzactii.filter((t) => t.reconciliat).length;
  const nereconciliate = tranzactii.filter((t) => !t.reconciliat).length;
  const syncTime = new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Open Banking</h1>
          <p className={styles.pageSubtitle}>
            Toate conturile tale, sincronizate via PSD2 · Reconciliere automată cu facturile
          </p>
        </div>
        <div className={styles.syncBadge}>
          <span className={styles.syncDot} />
          Sincronizat azi {syncTime}
        </div>
      </div>

      {/* Total card */}
      <div className={styles.totalCard}>
        <div className={styles.totalLeft}>
          <span className={styles.totalLabel}>Sold Consolidat</span>
          <span className={styles.totalValue}>{totalSold.toLocaleString("ro-RO")} lei</span>
          <div className={styles.totalMeta}>
            <span className={styles.reconcilatPill}>✅ {reconciliate} reconciliate automat</span>
            {nereconciliate > 0 && (
              <span className={styles.nerecilatPill}>⚠️ {nereconciliate} necesită atenție</span>
            )}
          </div>
        </div>
        <div className={styles.totalRight}>
          <div className={styles.miniBar}>
            {banci.map((b) => (
              <div key={b.id} className={styles.miniBarSegment}
                style={{ flex: b.sold / totalSold, background: b.color }}
                title={`${b.name}: ${b.sold.toLocaleString("ro-RO")} lei`} />
            ))}
          </div>
          <div className={styles.miniLegend}>
            {banci.map((b) => (
              <span key={b.id} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: b.color }} />
                {b.logo}: {Math.round(b.sold / totalSold * 100)}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bank cards */}
      <div className={styles.banciGrid}>
        {banci.map((b) => (
          <div key={b.id}
            className={`${styles.bancaCard} ${selectedBanca === b.id ? styles.bancaCardSelected : ""}`}
            onClick={() => setSelectedBanca(selectedBanca === b.id ? "toate" : b.id)}
            style={{ "--accent": b.color } as React.CSSProperties}
          >
            <div className={styles.bancaAccentBar} />
            <div className={styles.bancaTop}>
              <div className={styles.bancaLogo} style={{ background: b.color }}>{b.logo}</div>
              <div>
                <div className={styles.bancaName}>{b.name}</div>
                <div className={styles.bancaTip}>{b.tip}</div>
              </div>
            </div>
            <div className={styles.bancaSold}>{b.sold.toLocaleString("ro-RO")} {b.currency}</div>
            <div className={styles.bancaIban}>{b.iban}</div>
            <div className={styles.bancaSync}>Sincronizat: azi {syncTime}</div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className={styles.tranzSection}>
        <div className={styles.tranzHeader}>
          <h2 className={styles.sectionTitle}>
            Tranzacții recente
            {selectedBanca !== "toate" && (
              <span className={styles.bankFilter}> — {bancaName[selectedBanca]}</span>
            )}
          </h2>
          <div className={styles.filterBtns}>
            {(["toate", "bt", "bcr", "rz", "rev"] as const).map((b) => (
              <button key={b}
                className={`${styles.filterBtn} ${selectedBanca === b ? styles.filterBtnActive : ""}`}
                onClick={() => setSelectedBanca(b)}
              >
                {b === "toate" ? "Toate" : bancaName[b]}
              </button>
            ))}
          </div>
        </div>

        {loading && <div style={{ padding: "1rem", opacity: 0.6 }}>Se încarcă tranzacțiile...</div>}

        <div className={styles.tranzList}>
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", opacity: 0.6 }}>
              <p>Nicio tranzacție găsită.</p>
            </div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className={styles.tranzRow}>
              <div className={styles.tranzLeft}>
                <span className={`${styles.tranzIcon} ${t.tip === "credit" ? styles.credit : styles.debit}`}>
                  {t.tip === "credit" ? "↓" : "↑"}
                </span>
                <div>
                  <div className={styles.tranzDesc}>{t.descriere}</div>
                  <div className={styles.tranzMeta}>
                    {t.data} · {bancaName[t.banca] ?? t.banca}
                    {t.factura_ref && (
                      <span className={styles.tranzFactura}> · {t.factura_ref}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.tranzRight}>
                <span className={`${styles.tranzSuma} ${t.tip === "credit" ? styles.creditText : styles.debitText}`}>
                  {t.suma > 0 ? "+" : ""}{Number(t.suma).toLocaleString("ro-RO")} lei
                </span>
                <button
                  className={`${styles.tranzStatus} ${t.reconciliat ? styles.reconciliat : styles.nereconciliat}`}
                  onClick={() => toggleReconciliat(t)}
                  title="Click pentru a schimba statusul"
                >
                  {t.reconciliat ? "✓ reconciliată" : "⏳ nereconciliată"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
