import { Skeleton } from "@/components/skeleton";

export default function IctListingLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-10 sm:h-12 w-2/3" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full sm:w-3/4" />
        <Skeleton className="h-4 sm:w-1/2 w-2/3" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border-2 border-border rounded-[14px] bg-card overflow-hidden"
          >
            <Skeleton className="aspect-[16/10] rounded-none border-0 border-b-2" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-12">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10" />
        ))}
      </div>
    </div>
  );
}
