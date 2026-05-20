import { Skeleton } from "@/components/skeleton";

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
      <div className="flex justify-center">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
      <div className="flex justify-center mt-8">
        <Skeleton className="h-10 sm:h-14 w-64 sm:w-80" />
      </div>
      <div className="flex justify-center mt-10">
        <Skeleton className="h-14 w-44 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-20 text-left">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4 p-5 border-2 border-border rounded-[14px] bg-card">
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-4 w-32 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
