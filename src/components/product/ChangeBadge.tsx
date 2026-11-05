import { toBnPercent } from "@/lib/format";
import { CHANGE_STYLES } from "@/lib/price";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const style = CHANGE_STYLES[change.dir];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${style.badge}`}>
      {style.arrow} {toBnPercent(change.pct)}
    </span>
  );
}
