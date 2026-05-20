import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { NeoBadge } from "@/components/neo-card";
import { TradersFamilyCourse } from "@/components/traders-family-course";

export const metadata: Metadata = {
  title: "Traders Family | TradeSaurs",
  description:
    "Playlist video Traders Family untuk belajar metode trading Johnpaul77 secara bertahap tanpa loncat sesi.",
};

export default function TradersFamilyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="cursor-pointer inline-flex items-center gap-2 rounded-[10px] bg-card px-3 py-2 text-sm font-extrabold neo-border neo-shadow-sm neo-press focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ChevronLeft size={16} strokeWidth={3} /> Kembali ke beranda
      </Link>

      <header className="mb-8 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <NeoBadge className="bg-success text-success-foreground">
            Traders Family
          </NeoBadge>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl">
              Traders Family
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Metode trading asli Johnpaul77 yang digunakan untuk trading for
              living sejak tahun 2011. Metode trading yang diajarkan bisa
              digunakan di segala kondisi market.
            </p>
          </div>
        </div>
      </header>

      <TradersFamilyCourse />
    </div>
  );
}
