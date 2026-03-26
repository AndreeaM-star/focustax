"use client";

import { useState } from "react";
import styles from "./page.module.css";

const banci = [
  {
    id: "bt",
    name: "Banca Transilvania",
    iban: "RO49BTRL00001205XXX02001",
    sold: 145200,
    currency: "RON",
    color: "#2563eb",
    logo: "BT",
    tip: "Cont curent",
    ultimaSync: "azi 07:55",
  },
  {
    id: "bcr",
    name: "BCR",
    iban: "RO09RNCB0000000012345001",
    sold: 92400,
    currency: "RON",
    color: "#dc2626",
    logo: "BCR",
    tip: "Cont curent",
    ultimaSync: "azi 07:55",
  },
  {
    id: "rz",
    name: "Raiffeisen Bank",
    iban: "RO12RZBR0000060011000000",
    sold: 18750,
    currency: "RON",
    color: "#d97706",
    logo: "RZ",
    tip: "Cont curent",
    ultimaSync: "azi 07:55",
  },
  {
    id: "rev",
    name: "Revolut Business",
    iban: "RO98REVO00000000XXXXXXXX",
    sold: 47500,
    currency: "RON",
    color: "#7c3aed",
    logo: "RV",
    tip: "Cont curent EUR/RON",
    ultimaSync: "azi 07:55",
  },
];

const tranzactii = [
  { id: 1, data: "26 Mar", banca: "bt", tip: "credit", suma: 12450, desc: "Plată client Alpha Tech SRL", reconciliat: true, factura: "F2026-0839" },
  { id: 2, data: "26 Mar", banca: "rev", tip: "debit",  suma: -3200, desc: "Factură furnizor curent electric", reconciliat: true, factura: "P2026-0122" },
  { id: 3, data: "25 Mar", banca: "bcr", tip: "credit", suma: 8900,  desc: "Plată client Beta Construct SA", reconciliat: true, factura: "F2026-0835" },
  { id: 4, data: "25 Mar", banca: "bt",  tip: "debit",  suma: -1580, desc: "Chirie sediu Martie", reconciliat: false, factura: null },
  { id: 5, data: "24 Mar", banca: "rz",  tip: "credit", suma: 5800,  desc: "Plată client Gamma Logistic", reconciliat: true, factura: "F2026-0831" },
  { id: 6, data: "24 Mar", banca: "bt",  tip: "debit",  suma: -940,  desc: "Furnizor Delta Food SRL", reconciliat: false, factura: null },
  { id: 7, data: "23 Mar", banca: "bcr", tip: "credit", suma: 3100,  desc: "Avans proiect client nou", reconciliat: false, factura: null },
  { id: 8, data: "23 Mar", banca: "rev", tip: "debit",  suma: -2100, desc: "Publicitate online", reconciliat: true, factura: "P2026-0118" },
];

const bancaName: Record<string, string> = {
  bt: "BT", bcr: "BCR", rz: "Raiffeisen", rev: "Revolut",
};

export default function BanciPage() {
  const [selectedBanca, setSelectedBanca] = useState<string>("toate");

  const totalSold = banci.reduce((s, b) => s + b.sold, 0);
  const filtered = selectedBanca === "toate"
    ? tranzactii
    : tranzactii.filter((t) => t.banca === selectedBanca);

  const reconciliate = tranzactii.filter((t) => t.reconciliat).length;
  const nereconciliate = tranzactii.filter((t) => !t.reconciliat).length;

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
          Sincronizat azi 07:55
        </div>
      </div>

      {/* Total card */}
      <div className={styles.totalCard}>
        <div className={styles.totalLeft}>
          <span className={styles.totalLabel}>Sold Consolidat</span>
          <span className={styles.totalValue}>
            {totalSold.toLocaleString("ro-RO")} lei
          </span>
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
              <div
                key={b.id}
                className={styles.miniBarSegment}
                style={{
                  flex: b.sold / totalSold,
                  background: b.color,
                }}
                title={`${b.name}: ${b.sold.toLocaleString("ro-RO")} lei`}
              />
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
          <div
            key={b.id}
            className={`${styles.bancaCard} ${selectedBanca === b.id ? styles.bancaCardSelected : ""}`}
            onClick={() => setSelectedBanca(selectedBanca === b.id ? "toate" : b.id)}
            style={{ "--accent": b.color } as React.CSSProperties}
          >
            <div className={styles.bancaAccentBar} />
            <div className={styles.bancaTop}>
              <div className={styles.bancaLogo} style={{ background: b.color }}>
                {b.logo}
              </div>
              <div>
                <div className={styles.bancaName}>{b.name}</div>
                <div className={styles.bancaTip}>{b.tip}</div>
              </div>
            </div>
            <div className={styles.bancaSold}>
              {b.sold.toLocaleString("ro-RO")} {b.currency}
            </div>
            <div className={styles.bancaIban}>{b.iban}</div>
            <div className={styles.bancaSync}>Sync: {b.ultimaSync}</div>
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
              <button
                key={b}
                className={`${styles.filterBtn} ${selectedBanca === b ? styles.filterBtnActive : ""}`}
                onClick={() => setSelectedBanca(b)}
              >
                {b === "toate" ? "Toate" : bancaName[b]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tranzList}>
          {filtered.map((t) => (
            <div key={t.id} className={styles.tranzRow}>
              <div className={styles.tranzLeft}>
                <span className={`${styles.tranzIcon} ${t.tip === "credit" ? styles.credit : styles.debit}`}>
                  {t.tip === "credit" ? "↓" : "↑"}
                </span>
                <div>
                  <div className={styles.tranzDesc}>{t.desc}</div>
                  <div className={styles.tranzMeta}>
                    {t.data} · {bancaName[t.banca]}
                    {t.factura && (
                      <span className={styles.tranzFactura}> · {t.factura}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.tranzRight}>
                <span className={`${styles.tranzSuma} ${t.tip === "credit" ? styles.creditText : styles.debitText}`}>
                  {t.suma > 0 ? "+" : ""}{t.suma.toLocaleString("ro-RO")} lei
                </span>
                <span className={`${styles.tranzStatus} ${t.reconciliat ? styles.reconciliat : styles.nereconciliat}`}>
                  {t.reconciliat ? "✓ reconciliată" : "⏳ nereconciliată"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
