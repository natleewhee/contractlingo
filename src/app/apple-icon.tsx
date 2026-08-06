import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFC93C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 26,
            width: 120,
            height: 46,
            background: "#E6A600",
            borderRadius: "60px 60px 0 0",
          }}
        />
        <div
          style={{
            width: 132,
            height: 122,
            background: "#FF8A5B",
            borderRadius: "50%",
            border: "9px solid #21284A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 24,
              width: 26,
              height: 26,
              background: "#fff",
              borderRadius: "50%",
              border: "6px solid #21284A",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 24,
              width: 26,
              height: 26,
              background: "#fff",
              borderRadius: "50%",
              border: "6px solid #21284A",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
