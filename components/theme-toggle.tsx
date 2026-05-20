"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, toggle, mounted } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      onClick={toggle}
      className="cursor-pointer neo-border neo-shadow-sm neo-press bg-main text-main-foreground rounded-[10px] p-2 h-10 w-10 flex items-center justify-center"
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} strokeWidth={3} />
        ) : (
          <Moon size={18} strokeWidth={3} />
        )
      ) : (
        <span className="block w-[18px] h-[18px]" />
      )}
    </button>
  );
}
