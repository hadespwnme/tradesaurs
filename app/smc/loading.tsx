import { Skeleton } from "@/components/skeleton";

export default function SmcLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Skeleton className="h-9 w-44" />

      <div className="mt-6 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 sm:h-12 w-full" />
        <Skeleton className="aspect-[16/9] w-full rounded-[14px]" />
      </div>

      <div className="p-6 border-2 border-border bg-card rounded-[14px] space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="space-y-8 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
