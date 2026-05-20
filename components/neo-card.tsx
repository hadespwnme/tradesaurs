import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function NeoCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "neo-border neo-shadow bg-card text-card-foreground rounded-[14px] p-5",
        className
      )}
      {...props}
    />
  );
}

export function NeoBadge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "neo-border neo-shadow-sm inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-[8px] bg-accent text-card-foreground",
        className
      )}
      {...props}
    />
  );
}
