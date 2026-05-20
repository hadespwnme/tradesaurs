import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createSocialImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f4f1ff 0%, #e6deff 50%, #d9efff 100%)",
          color: "#0b0b15",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(11,11,21,0.05) 18px, rgba(11,11,21,0.05) 20px)",
            opacity: 0.5,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 54,
            right: 64,
            width: 210,
            height: 210,
            borderRadius: 36,
            border: "6px solid #0b0b15",
            background: "#00bf63",
            boxShadow: "16px 16px 0 #0b0b15",
            transform: "rotate(12deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 88,
            right: 260,
            width: 120,
            height: 120,
            borderRadius: 9999,
            border: "6px solid #0b0b15",
            background: "#4f7cff",
            boxShadow: "10px 10px 0 #0b0b15",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 210,
                padding: "14px 18px",
                borderRadius: 18,
                border: "4px solid #0b0b15",
                background: "#7c5cff",
                boxShadow: "8px 8px 0 #0b0b15",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              TradeSaurs
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#4b4769",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <span>Resource trading</span>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#0b0b15",
                }}
              />
              <span>Bahasa Indonesia</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 98,
                  lineHeight: 0.92,
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                }}
              >
                Belajar Trading
              </div>
              <div
                style={{
                  fontSize: 98,
                  lineHeight: 0.92,
                  fontWeight: 900,
                  letterSpacing: "-0.06em",
                }}
              >
                Tanpa Ribet
              </div>
            </div>

            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                color: "#26233c",
                fontWeight: 600,
                maxWidth: 700,
              }}
            >
              Materi ICT, Smart Money Concepts, dan Traders Family dirangkum
              rapi dalam satu tempat.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            {[
              { label: "ICT", background: "#7c5cff", color: "#ffffff" },
              { label: "SMC", background: "#4f7cff", color: "#ffffff" },
              {
                label: "TRADERS FAMILY",
                background: "#00bf63",
                color: "#052814",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 22px",
                  borderRadius: 18,
                  border: "4px solid #0b0b15",
                  background: badge.background,
                  color: badge.color,
                  boxShadow: "8px 8px 0 #0b0b15",
                  fontSize: 24,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 66,
            bottom: 58,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
            color: "#2a2650",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {siteConfig.creator}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            tradesaurs.vercel.app
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
