import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b-2 border-border">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-pixel text-xs sm:text-sm tracking-tight hover:text-main transition-colors"
        >
          TRADESAURS
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
