import type { Market, Product } from "./types";

export type Direction = Product["change"]["dir"];

export const CHANGE_STYLES: Record<Direction, { arrow: string; text: string; badge: string }> = {
  up: { arrow: "▲", text: "text-down", badge: "bg-red-50 text-down" },
  down: { arrow: "▼", text: "text-up", badge: "bg-green-50 text-up" },
  flat: { arrow: "-", text: "text-muted", badge: "bg-mint text-muted" },
};

export function marketAverage(market: Market) {
  return (market.min + market.max) / 2;
}

export function priceSummary(product: Product) {
  const markets = product.markets;
  const cheapest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const costliest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = markets.reduce((sum, m) => sum + marketAverage(m), 0) / markets.length;

  return {
    min: cheapest.min,
    cheapestMarket: cheapest.market,
    max: costliest.max,
    costliestMarket: costliest.market,
    average: Math.round(average),
  };
}

export function topMovers(products: Product[], dir: "up" | "down", count = 6) {
  return products
    .filter((product) => product.change.dir === dir)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}
