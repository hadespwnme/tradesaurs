import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeSaurs — Resource Belajar Trading",
  description:
    "Kumpulan resource belajar ICT (Inner Circle Trader) dan Smart Money Concepts dalam Bahasa Indonesia. Gaya neobrutalism, dibuat oleh hadespwnme.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${pressStart.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t-2 border-border mt-16 py-6 px-4 text-center text-sm font-medium bg-card">
            <p>
              TradeSaurs · dibuat oleh{" "}
              <a
                href="https://github.com/hadespwnme"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-2 hover:text-main"
              >
                @hadespwnme
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
