import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont() {
  const res = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/literata@5.2.8/cyrillic-500-normal.woff",
  );
  if (!res.ok) {
    throw new Error(`Failed to load OG font: ${res.status}`);
  }
  return res.arrayBuffer();
}

export default async function OpenGraphImage() {
  const literata = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #F7F5F2 0%, #F8EAEE 48%, #E7EEEB 100%)",
          fontFamily: "Literata",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7A8F88",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              border: "1.5px solid #E8A4B0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E8A4B0",
              fontSize: 14,
            }}
          >
            +
          </div>
          Акушер-гинеколог · София
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              color: "#1A2332",
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Д-р Мария Райкова
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#5A6570",
              maxWidth: 780,
            }}
          >
            Спокойна грижа, ясни обяснения и преглед без усещане за бързане.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#5A6570",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>НЗОК</span>
            <span>4.9 / 5 Superdoc</span>
            <span>ул. Добрила 10</span>
          </div>
          <div style={{ color: "#7A8F88", letterSpacing: "0.04em" }}>
            drmariaraykova.bg
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Literata",
          data: literata,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
