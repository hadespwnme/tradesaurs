import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { SummaryDoc, ContentBlock } from "@/lib/content";

export function ArticleContent({ doc }: { doc: SummaryDoc }) {
  let headingCount = 0;
  return (
    <article className="space-y-8">
      <div className="neo-border neo-shadow bg-card rounded-[14px] p-6 text-base/relaxed font-medium">
        <p>{doc.intro}</p>
      </div>

      {doc.blocks.map((b, i) => {
        if (b.type === "image") {
          return <BlockImage key={`img-${i}`} block={b} />;
        }
        headingCount += b.level <= 2 ? 1 : 0;
        return (
          <BlockHeading
            key={`h-${i}`}
            block={b}
            indexLabel={
              b.level <= 2 ? String(headingCount).padStart(2, "0") : null
            }
          />
        );
      })}

      <a
        href={doc.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="cursor-pointer inline-flex items-center gap-2 neo-border neo-shadow neo-press bg-main text-main-foreground rounded-[10px] px-4 py-3 font-extrabold"
      >
        Baca selengkapnya di sumber asli
        <ExternalLink size={18} strokeWidth={3} />
      </a>
    </article>
  );
}

function BlockHeading({
  block,
  indexLabel,
}: {
  block: Extract<ContentBlock, { type: "heading" }>;
  indexLabel: string | null;
}) {
  const top = block.level <= 2;
  return (
    <section className={top ? "pt-2" : ""}>
      {top ? (
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight border-b-2 border-border pb-2">
          {indexLabel ? (
            <span className="font-pixel text-main text-base mr-2">
              {indexLabel}
            </span>
          ) : null}
          {block.text}
        </h2>
      ) : block.level === 3 ? (
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2">
          {block.text}
        </h3>
      ) : (
        <h4 className="text-lg sm:text-xl font-bold tracking-tight mt-2">
          {block.text}
        </h4>
      )}
      <div className="mt-3 space-y-3 text-[15px] sm:text-base/relaxed font-medium text-card-foreground">
        {block.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function BlockImage({
  block,
}: {
  block: Extract<ContentBlock, { type: "image" }>;
}) {
  return (
    <figure className="neo-border neo-shadow bg-card rounded-[12px] overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        <Image
          src={block.src}
          alt={block.alt || "Ilustrasi"}
          fill
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-contain bg-muted"
          unoptimized
        />
      </div>
      {block.alt ? (
        <figcaption className="text-xs px-3 py-2 border-t-2 border-border bg-muted/60 text-muted-foreground">
          {block.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}
