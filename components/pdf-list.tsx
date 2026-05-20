import { FileDown } from "lucide-react";
import type { ScrapedPdf } from "@/lib/data";

export function PdfList({ pdfs }: { pdfs: ScrapedPdf[] }) {
  if (!pdfs || pdfs.length === 0) return null;
  return (
    <section className="neo-border neo-shadow bg-accent text-card-foreground rounded-[14px] p-5 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="neo-border bg-card rounded-[8px] p-1.5">
          <FileDown size={18} strokeWidth={3} />
        </span>
        <h2 className="font-pixel text-xs sm:text-sm">PDF dari sumber asli</h2>
        <span className="ml-auto text-xs font-bold opacity-80">
          {pdfs.length} file
        </span>
      </div>
      <p className="text-sm font-medium mb-4">
        Tautan unduh langsung ke file PDF yang dipublikasikan di artikel sumber.
        File di-host pada server sumber aslinya.
      </p>
      <ul className="space-y-2">
        {pdfs.map((p, i) => (
          <li key={i}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer neo-border neo-shadow-sm neo-press bg-card text-card-foreground rounded-[10px] px-3 py-2.5 flex items-start gap-3 group"
            >
              <FileDown
                size={18}
                strokeWidth={3}
                className="mt-0.5 shrink-0 text-main group-hover:translate-x-0.5 transition-transform"
              />
              <span className="flex-1 min-w-0">
                <span className="block font-extrabold text-sm leading-snug">
                  {p.label}
                </span>
                <span className="block text-xs text-muted-foreground truncate mt-0.5">
                  {p.url}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
