import { Skeleton } from "@heroui/react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
        <Skeleton className="size-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-4 w-52 rounded" />
        </div>
      </div>
      <Skeleton className="mb-4 h-16 w-full rounded-2xl" />
      <ProductGridSkeleton count={3} />
    </div>
  );
}
