/**
 * OG image utilities — font loading and shared template.
 *
 * Font is fetched at build time (SSG) so OG images are fully static.
 */

/** Font data cache — loaded once per build. */
let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

/**
 * Load Noto Sans SC (CJK) from Google Fonts.
 * Covers zh-TW, ja, and English text in OG images.
 */
async function loadFont(weight: 400 | 700): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@${weight}&display=swap`;
  const css = await (await fetch(cssUrl)).text();
  // Google Fonts CSS format: @font-face { src: url(https://...) format('woff2'); ... }
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/);
  if (!match) throw new Error(`Could not extract font URL for Noto Sans SC weight ${weight}`);
  const resp = await fetch(match[1]);
  return resp.arrayBuffer();
}

/** Get cached font data (400 weight). Loads once per build. */
export async function getFontRegular(): Promise<ArrayBuffer> {
  if (!fontRegular) fontRegular = await loadFont(400);
  return fontRegular;
}

/** Get cached font data (700 weight). Loads once per build. */
export async function getFontBold(): Promise<ArrayBuffer> {
  if (!fontBold) fontBold = await loadFont(700);
  return fontBold;
}

/** Shared OG image font config. */
export function ogFonts(regular: ArrayBuffer, bold: ArrayBuffer) {
  return [
    { name: "Noto Sans SC", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Noto Sans SC", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

/** Standard OG image dimensions. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Shared OG image JSX template. */
export function OgTemplate({
  title,
  description,
  badge,
  siteName = "thebazi.com",
}: {
  title: string;
  description?: string;
  badge?: string;
  siteName?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #18181b 100%)",
        fontFamily: "'Noto Sans SC', sans-serif",
        padding: 0,
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: 8,
          width: "100%",
          background: "linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #dc2626 100%)",
        }}
      />

      {/* Main content area — flex column with auto margins */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 60px",
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#f59e0b",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                background: "rgba(245, 158, 11, 0.1)",
                padding: "4px 12px",
                borderRadius: 4,
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: description ? 16 : 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "85%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 60px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span style={{ fontSize: 16, color: "#71717a" }}>{siteName}</span>
      </div>
    </div>
  );
}
