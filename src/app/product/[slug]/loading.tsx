import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <Skeleton className="h-4 w-48 rounded" />
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-6">
        <Skeleton className="size-20 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-56 rounded" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        <Skeleton className="hidden h-24 w-32 rounded-2xl sm:block" />
      </div>
      <div className="space-y-4 rounded-2xl border border-line bg-white p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );
}
