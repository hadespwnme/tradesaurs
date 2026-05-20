import { NeoCard } from "@/components/neo-card";
import { Skeleton } from "@/components/skeleton";
import { cn } from "@/lib/utils";

function LoadingStatus({
  children,
  className,
  label = "Memuat konten",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

function ResourceCardSkeleton({ className }: { className?: string }) {
  return (
    <NeoCard className={cn("h-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-8 w-4/5" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-4 w-32" />
    </NeoCard>
  );
}

export function HomePageSkeleton() {
  return (
    <LoadingStatus
      className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center"
      label="Memuat beranda"
    >
      <div className="flex justify-center">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-12 w-64 sm:w-80" />
      </div>
      <div className="mt-5 flex justify-center">
        <Skeleton className="h-5 w-72 sm:w-96" />
      </div>
      <div className="mt-10 flex justify-center">
        <Skeleton className="h-14 w-44 rounded-full" />
      </div>

      <div className="mt-20 grid gap-6 text-left md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <ResourceCardSkeleton key={index} />
        ))}
      </div>
    </LoadingStatus>
  );
}

export function ArticlePageSkeleton({
  label,
  blocks = 5,
}: {
  label: string;
  blocks?: number;
}) {
  return (
    <LoadingStatus
      className="max-w-3xl mx-auto px-4 py-10"
      label={`Memuat ${label}`}
    >
      <Skeleton className="h-9 w-44" />

      <div className="mt-6 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-full sm:h-12" />
        <Skeleton className="h-10 w-2/3 sm:h-12" />
        <Skeleton className="aspect-[16/9] w-full rounded-[14px]" />
      </div>

      <NeoCard className="space-y-2 p-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </NeoCard>

      <div className="mt-8 space-y-8">
        {Array.from({ length: blocks }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            <Skeleton className="mt-3 aspect-[16/10] w-full rounded-[12px]" />
          </div>
        ))}
      </div>
    </LoadingStatus>
  );
}

export function IctListingSkeleton() {
  return (
    <LoadingStatus
      className="max-w-6xl mx-auto px-4 py-12"
      label="Memuat daftar artikel ICT"
    >
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-3 h-10 w-2/3 sm:h-12" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full sm:w-3/4" />
        <Skeleton className="h-4 w-2/3 sm:w-1/2" />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[14px] border-2 border-border bg-card neo-shadow"
          >
            <Skeleton className="aspect-[16/10] rounded-none border-0 border-b-2" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="mt-2 h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-10" />
        ))}
      </div>
    </LoadingStatus>
  );
}

export function TradersFamilyCourseSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
      <div className="overflow-hidden rounded-[14px] border-2 border-border bg-card neo-shadow">
        <div className="border-b-2 border-border bg-muted px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-56 sm:w-80" />
            </div>
            <Skeleton className="h-10 w-16" />
          </div>
        </div>

        <Skeleton className="aspect-video w-full rounded-none border-0" />

        <div className="space-y-5 p-5 sm:p-6">
          <Skeleton className="h-10 w-44" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-11 flex-1 sm:max-w-44" />
            <Skeleton className="h-11 flex-1 sm:max-w-48" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[14px] border-2 border-border bg-card neo-shadow"
          >
            <div className="space-y-3 p-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-2 border-t-2 border-border bg-muted/60 p-3">
              {Array.from({ length: 3 }).map((_, sessionIndex) => (
                <Skeleton key={sessionIndex} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TradersFamilyPageSkeleton() {
  return (
    <LoadingStatus
      className="max-w-6xl mx-auto px-4 py-10"
      label="Memuat halaman Traders Family"
    >
      <Skeleton className="h-10 w-44" />

      <div className="mb-8 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-28" />
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <Skeleton className="h-10 w-64 sm:h-12 sm:w-80" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full max-w-3xl" />
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-4/5 max-w-xl" />
            </div>
          </div>
        </div>
      </div>

      <TradersFamilyCourseSkeleton />
    </LoadingStatus>
  );
}
