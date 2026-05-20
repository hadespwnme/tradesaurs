import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, FileDown } from "lucide-react";
import { getIctByPage } from "@/lib/data";
import { Pagination } from "@/components/pagination";
import { NeoCard, NeoBadge } from "@/components/neo-card";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const { totalPages } = await getIctByPage(1);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = Number.parseInt(pageStr, 10);

  return createMetadata({
    title: `ICT Page ${page} | TradeSaurs`,
    description:
      "Kumpulan artikel ICT berbahasa Indonesia tentang liquidity, order block, fair value gap, market structure, dan konsep turunannya.",
    path: `/ict/page/${page}`,
  });
}

export default async function IctListingPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageStr } = await params;
  const page = Number.parseInt(pageStr, 10);
  if (!page || page < 1) notFound();

  const { items, totalPages } = await getIctByPage(page);
  if (items.length === 0 && page !== 1) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="font-pixel text-xs text-main">/ ict</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
          Inner Circle Trader
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((a) => (
          <Link
            key={a.slug}
            href={`/ict/${a.slug}`}
            className="block group"
          >
            <NeoCard className="h-full cursor-pointer neo-press flex flex-col p-0 overflow-hidden">
              <div className="relative aspect-[16/10] bg-muted border-b-2 border-border">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-pixel text-main/80">
                    ICT
                  </div>
                )}
                <NeoBadge className="absolute top-2 right-2 bg-main text-main-foreground">
                  Page {a.page}
                </NeoBadge>
                {(a.structure?.pdfs?.length ?? 0) > 0 ? (
                  <NeoBadge className="absolute top-2 left-2 bg-accent">
                    <FileDown size={11} strokeWidth={3} className="mr-1" />
                    PDF
                  </NeoBadge>
                ) : null}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="font-extrabold text-base leading-snug line-clamp-3">
                  {a.title}
                </h2>
                <p className="mt-auto pt-3 text-xs font-bold text-main inline-flex items-center gap-1">
                  Lebih banyak...
                  <ArrowUpRight size={14} strokeWidth={3} />
                </p>
              </div>
            </NeoCard>
          </Link>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        hrefFor={(p) => `/ict/page/${p}`}
      />
    </div>
  );
}
