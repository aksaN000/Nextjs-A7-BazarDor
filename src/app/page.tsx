import { Skeleton } from "@heroui/react";
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductSections from "@/components/home/ProductSections";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

function SectionsSkeleton() {
  return (
    <div className="mt-10 space-y-4">
      <Skeleton className="h-7 w-48 rounded-lg" />
      <ProductGridSkeleton />
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Hero />
      <Suspense fallback={<SectionsSkeleton />}>
        <ProductSections />
      </Suspense>
    </div>
  );
}
