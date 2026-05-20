import Image from "next/image";
import Link from "next/link";
import { ChartCandlestick } from "lucide-react";
import { ScrollDown } from "@/components/scroll-down";
import { NeoCard } from "@/components/neo-card";

export default function HomePage() {
  return (
    <div>
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
        <div className="absolute inset-0 -z-10 scanline opacity-50" />
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="https://github.com/hadespwnme.png"
              alt="Foto profil hadespwnme"
              width={160}
              height={160}
              priority
              className="neo-border rounded-full bg-card relative"
            />
          </div>
        </div>

        <h1 className="mt-8 font-pixel text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          TradeSaurs
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg font-medium text-muted-foreground">
          Resource berbahasa indonesia untuk belajar Trading
        </p>

        <ScrollDown targetId="resources" />
      </section>

      <section
        id="resources"
        className="max-w-6xl mx-auto px-4 pb-24 scroll-mt-24"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/ict" className="block group">
            <NeoCard className="h-full bg-main text-main-foreground dark:text-white neo-press cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="neo-border bg-card text-card-foreground rounded-[10px] p-3">
                  <ChartCandlestick size={28} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="mt-5 font-pixel text-lg sm:text-xl">ICT</h3>
              <p className="mt-1 text-2xl font-extrabold leading-tight">
                Inner Circle Trader
              </p>
              <p className="mt-3 text-sm/relaxed opacity-95">
                Konsep order block, fair value gap, liquidity, kill zones,
                market structure — dirangkum dari 10 halaman blog ICT.
              </p>
              <p className="mt-6 text-sm font-extrabold underline underline-offset-4">
                baca resource...
              </p>
            </NeoCard>
          </Link>

          <Link href="/smc" className="block group">
            <NeoCard className="h-full bg-secondary text-main-foreground dark:text-white neo-press cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="neo-border bg-card text-card-foreground rounded-[10px] p-3">
                  <ChartCandlestick size={28} strokeWidth={2.5} />
                </div>
              </div>
              <h3 className="mt-5 font-pixel text-lg sm:text-xl">SMC</h3>
              <p className="mt-1 text-2xl font-extrabold leading-tight">
                Smart Money Concepts
              </p>
              <p className="mt-3 text-sm/relaxed opacity-95">
                Memahami pergerakan institusi: BOS, CHoCH, order block,
                liquidity pool, dan supply / demand.
              </p>
              <p className="mt-6 text-sm font-extrabold underline underline-offset-4">
                baca resource...
              </p>
            </NeoCard>
          </Link>

          <Link href="/traders-family" className="block group">
            <NeoCard className="h-full bg-[var(--success)] text-[var(--success-foreground)] neo-press cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="neo-border flex h-14 w-14 items-center justify-center rounded-[10px] bg-card text-card-foreground p-2">
                  <Image
                    src="/traders-family-logo.svg"
                    alt="Logo Traders Family"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </div>
              </div>
              <h3 className="mt-5 font-pixel text-lg sm:text-xl">
                Traders Family
              </h3>
              <p className="mt-1 text-2xl font-extrabold leading-tight">
                Metode Johnpaul77
              </p>
              <p className="mt-3 text-sm/relaxed opacity-95">
                Metode trading asli Johnpaul77 yang digunakan untuk trading for
                living sejak tahun 2011. Metode trading yang diajarkan bisa
                digunakan di segala kondisi market.
              </p>
              <p className="mt-6 text-sm font-extrabold underline underline-offset-4">
                mulai belajar...
              </p>
            </NeoCard>
          </Link>
        </div>
      </section>
    </div>
  );
}
