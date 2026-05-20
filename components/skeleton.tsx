import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "motion-safe:animate-pulse motion-reduce:animate-none rounded-[10px] border-2 border-border bg-muted",
        className,
      )}
      aria-hidden="true"
      data-slot="skeleton"
      {...props}
    />
  );
}
