import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: petrol field, one orange rule, large headline. */
export function renderOgImage({ kicker, headline }: { kicker: string; headline: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e3b43",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 10, background: "#ff7a1a", borderRadius: 5 }} />
          <div style={{ marginTop: 36, fontSize: 34, color: "#a9c4c6" }}>{kicker}</div>
        </div>
        <div style={{ fontSize: headline.length > 48 ? 64 : 80, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
          {headline}
        </div>
        <div style={{ fontSize: 28, color: "#a9c4c6" }}>ali-raza-engineer.vercel.app</div>
      </div>
    ),
    ogSize
  );
}
