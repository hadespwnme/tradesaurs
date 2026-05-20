import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getIctArticles, getIctBySlug } from "@/lib/data";
import { ArticleContent } from "@/components/article-content";
import { NeoBadge } from "@/components/neo-card";
import { PdfList } from "@/components/pdf-list";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const all = await getIctArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getIctBySlug(slug);

  if (!data) {
    return createMetadata({
      title: "Artikel ICT | TradeSaurs",
      description:
        "Ringkasan artikel ICT berbahasa Indonesia untuk membantu belajar struktur market, liquidity, dan order flow.",
      path: `/ict/${slug}`,
    });
  }

  const description = `Ringkasan ICT dalam Bahasa Indonesia untuk topik ${data.raw.title}. Fokus pada konsep market structure, liquidity, dan entry model.`;

  return createMetadata({
    title: `${data.raw.title} | TradeSaurs`,
    description,
    path: `/ict/${slug}`,
  });
}

export default async function IctDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getIctBySlug(slug);
  if (!data) notFound();
  const { raw, summary } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href={`/ict/page/${raw.page}`}
        aria-label="Kembali ke daftar"
        className="cursor-pointer fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 text-sm font-extrabold neo-border neo-shadow bg-card text-card-foreground rounded-full px-4 py-3 neo-press"
      >
        <ChevronLeft size={16} strokeWidth={3} />
        <span className="hidden sm:inline">Kembali ke daftar</span>
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <NeoBadge className="bg-main text-main-foreground">ICT</NeoBadge>
          <NeoBadge>Halaman blog {raw.page}</NeoBadge>
          <NeoBadge className="bg-secondary text-main-foreground">
            Bahasa Indonesia
          </NeoBadge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {raw.title}
        </h1>
        {raw.image ? (
          <figure className="mt-6 neo-border neo-shadow bg-card rounded-[14px] overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src={raw.image}
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
