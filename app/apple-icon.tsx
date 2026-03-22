import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-4px",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          FT
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "sans-serif",
            letterSpacing: "2px",
            marginTop: 6,
          }}
        >
          FOCUSTAX
        </span>
      </div>
    ),
    { ...size }
  );
}
