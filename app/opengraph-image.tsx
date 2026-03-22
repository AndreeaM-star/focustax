import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          display: "flex",
        }} />

        {/* Logo badge */}
        <div style={{
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.3)",
          borderRadius: "20px",
          padding: "12px 32px",
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{
            background: "white",
            borderRadius: "10px",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ color: "#2563eb", fontSize: 24, fontWeight: 900, letterSpacing: "-1px" }}>FT</span>
          </div>
          <span style={{ color: "white", fontSize: 28, fontWeight: 800, letterSpacing: "3px" }}>FOCUSTAX</span>
        </div>

        {/* Main title */}
        <h1 style={{
          color: "white",
          fontSize: 72,
          fontWeight: 900,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}>
          Claritate în taxe
        </h1>

        {/* Subtitle */}
        <p style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: 28,
          margin: "20px 0 0",
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.4,
        }}>
          Declarații fiscale, ghiduri practice și comparații pentru România
        </p>

        {/* Bottom bar */}
        <div style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          gap: 40,
          color: "rgba(255,255,255,0.6)",
          fontSize: 20,
        }}>
          <span>focustax.ro</span>
          <span>·</span>
          <span>Gratuit</span>
          <span>·</span>
          <span>Actualizat 2026</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
