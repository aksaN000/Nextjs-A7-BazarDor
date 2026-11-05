import { taka, toBnPercent, unitName } from "@/lib/format";
import { CHANGE_STYLES } from "@/lib/price";
import type { Product } from "@/lib/types";

function TickerItem({ product }: { product: Product }) {
  const style = CHANGE_STYLES[product.change.dir];

  return (
    <span className="flex shrink-0 items-center gap-2 border-r border-line px-5 text-sm">
      <span>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span className="text-muted">
        {taka(product.today)}/{unitName(product.unit)}
      </span>
      <span className={`font-semibold ${style.text}`}>
        {style.arrow} {toBnPercent(product.change.pct)}
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-line bg-white py-2">
      <div className="ticker-track flex w-max">
        {[...products, ...products].map((product, index) => (
          <TickerItem key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
