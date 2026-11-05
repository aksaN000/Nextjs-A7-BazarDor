import { taka, toBnPercent, unitName } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItem({ product }: { product: Product }) {
  const { dir, pct } = product.change;
  const color = dir === "up" ? "text-up" : dir === "down" ? "text-down" : "text-muted";
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "•";

  return (
    <span className="flex shrink-0 items-center gap-2 px-5 text-sm">
      <span>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span className="text-muted">
        {taka(product.today)}/{unitName(product.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {arrow} {toBnPercent(pct)}
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-line bg-mint py-2">
      <div className="ticker-track flex w-max">
        {[...products, ...products].map((product, index) => (
          <TickerItem key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
