import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: ink navy, one amber rule, large headline. */
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
          background: "#0d1b2a",
          color: "#f5f7fa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 10, background: "#ffb020", borderRadius: 5 }} />
          <div style={{ marginTop: 36, fontSize: 34, color: "#a7b6c6" }}>{kicker}</div>
        </div>
        <div style={{ fontSize: headline.length > 48 ? 64 : 80, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
          {headline}
        </div>
        <div style={{ fontSize: 28, color: "#a7b6c6" }}>ali-raza-engineer.vercel.app</div>
      </div>
    ),
    ogSize
  );
}
