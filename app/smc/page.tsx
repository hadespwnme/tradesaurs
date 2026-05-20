import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getSmc } from "@/lib/data";
import { ArticleContent } from "@/components/article-content";
import { NeoBadge } from "@/components/neo-card";
import { PdfList } from "@/components/pdf-list";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "SMC | TradeSaurs",
  description:
    "Ringkasan Smart Money Concepts dalam Bahasa Indonesia: market structure, liquidity, BOS, CHoCH, fair value gap, dan order block.",
  path: "/smc",
});

export default async function SmcPage() {
  const { raw, summary } = await getSmc();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-extrabold neo-border neo-shadow-sm bg-card rounded-[10px] px-3 py-2 neo-press"
      >
        <ChevronLeft size={16} strokeWidth={3} /> Kembali ke beranda
      </Link>

      <header className="mt-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <NeoBadge className="bg-secondary text-main-foreground">SMC</NeoBadge>
          <NeoBadge className="bg-main text-main-foreground">
            Bahasa Indonesia
          </NeoBadge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {raw.title}
        </h1>
        {raw.hero ? (
          <figure className="mt-6 neo-border neo-shadow bg-card rounded-[14px] overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={raw.hero}
                alt={raw.title}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </figure>
        ) : null}
        <PdfList pdfs={raw.structure?.pdfs ?? []} />
      </header>

      <ArticleContent doc={summary} />
    </div>
  );
}
