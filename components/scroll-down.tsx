"use client";

import { ArrowDown } from "lucide-react";

export function ScrollDown({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      aria-label="Scroll ke daftar resource"
      onClick={() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="cursor-pointer mt-20 inline-flex flex-col items-center gap-5 group"
    >
      <span className="text-xs font-bold tracking-widest uppercase">
        Lihat Resource
      </span>
      <span className="neo-border neo-shadow bg-main text-main-foreground rounded-full p-3 group-hover:translate-y-1 transition-transform animate-bounce">
        <ArrowDown size={26} strokeWidth={3} />
      </span>
    </button>
  );
}
