import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[10px] border-2 border-border bg-muted",
        className,
      )}
      {...props}
    />
  );
}
