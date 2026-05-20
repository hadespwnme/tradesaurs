import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (p: number) => string;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 sm:gap-2 mt-12 flex-wrap"
    >
      <PaginationLink
        href={hrefFor(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={18} strokeWidth={3} />
      </PaginationLink>
      {pages.map((p) => (
        <PaginationLink
          key={p}
          href={hrefFor(p)}
          active={p === page}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </PaginationLink>
      ))}
      <PaginationLink
        href={hrefFor(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={18} strokeWidth={3} />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  active,
  disabled,
  children,
  ...rest
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>) {
  const base =
    "neo-border neo-shadow-sm rounded-[10px] min-w-10 h-10 px-3 flex items-center justify-center font-extrabold text-sm select-none";
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "bg-muted text-muted-foreground opacity-60 cursor-not-allowed")}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      scroll
      className={cn(
        base,
        "cursor-pointer neo-press",
        active
          ? "bg-main text-main-foreground"
          : "bg-card text-card-foreground hover:bg-accent",
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
