import { taka } from "@/lib/format";
import { marketAverage } from "@/lib/price";
import type { Market } from "@/lib/types";

export default function MarketTable({ markets }: { markets: Market[] }) {
  const rows = [...markets].sort((a, b) => marketAverage(a) - marketAverage(b));

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-mint text-left text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">বাজার</th>
            <th className="px-4 py-3 font-medium">বিভাগ</th>
            <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
            <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
            <th className="px-4 py-3 text-right font-medium">গড়</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((market) => (
            <tr key={market.market} className="even:bg-mint/40">
              <td className="px-4 py-3 font-medium">{market.market}</td>
              <td className="px-4 py-3 text-muted">{market.division}</td>
              <td className="px-4 py-3 text-right">{taka(market.min)}</td>
              <td className="px-4 py-3 text-right">{taka(market.max)}</td>
              <td className="px-4 py-3 text-right font-semibold">{taka(marketAverage(market))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
