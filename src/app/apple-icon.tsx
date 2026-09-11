import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same "APPROVED" stamp mark as icon.svg (see DESIGN.md), rebuilt for
// Satori's more limited SVG support.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#D9A62E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 100 100">
          <g transform="rotate(-8 50 50)">
            <ellipse cx="50" cy="50" rx="30" ry="25" fill="none" stroke="#241D14" strokeWidth="7" />
            <path
              d="M36 51l9 9 19-19"
              fill="none"
              stroke="#241D14"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
