import { Card } from "@heroui/react";
import Link from "next/link";
import { perUnit, toBn } from "@/lib/format";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <Card className="h-full gap-4 border border-line p-4 shadow-none transition group-hover:-translate-y-0.5 group-hover:border-brand/50 group-hover:shadow-md">
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mint text-2xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold group-hover:text-brand">{product.nameBn}</h3>
            <p className="text-xs text-muted">{perUnit(product.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-muted">আজকের দাম</p>
            <p className="text-lg font-bold">
              {toBn(product.today)} <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </Card>
    </Link>
  );
}
