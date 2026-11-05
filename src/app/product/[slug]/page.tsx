import { Chip } from "@heroui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import ChangeBadge from "@/components/product/ChangeBadge";
import MarketTable from "@/components/product/MarketTable";
import { getProductBySlug } from "@/lib/api";
import { perUnit, taka, toBn, unitName } from "@/lib/format";
import { CHANGE_STYLES, priceSummary } from "@/lib/price";

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} | বাজার দর` : "পাওয়া যায়নি | বাজার দর" };
}

function SummaryStat({ label, value, note, color }: { label: string; value: number; note: string; color: string }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>
        {toBn(value)} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const summary = priceSummary(product);
  const diff = product.today - product.yesterday;
  const changeWord = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 flex items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <FiChevronRight />
        <Link href={`/category/${product.category}`} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>
        <FiChevronRight />
        <span className="text-ink">{product.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-mint text-4xl sm:size-20 sm:text-5xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-muted">
              {perUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              <span className={`font-semibold ${CHANGE_STYLES[product.change.dir].text}`}>{changeWord}</span>
              {diff !== 0 && ` · ${taka(Math.abs(diff))}`}
            </p>
            <div className="mt-2 flex gap-2">
              <Chip size="sm" color="success" variant="soft">{product.categoryNameBn}</Chip>
              <Chip size="sm" variant="soft">{perUnit(product.unit)}</Chip>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-mint px-6 py-4 text-center">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(product.today)}</p>
          <p className="text-xs text-muted">টাকা / {unitName(product.unit)}</p>
          <div className="mt-1">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <SummaryStat
            label="সর্বনিম্ন দাম"
            value={summary.min}
            note={`সবচেয়ে কম দামের বাজার: ${summary.cheapestMarket}`}
            color="text-up"
          />
          <SummaryStat
            label="সর্বাধিক দাম"
            value={summary.max}
            note={`সবচেয়ে বেশি দামের বাজার: ${summary.costliestMarket}`}
            color="text-down"
          />
          <SummaryStat
            label="গড় দাম"
            value={summary.average}
            note={`${perUnit(product.unit)}-এর হিসাবে`}
            color="text-up"
          />
        </div>

        <h2 className="mb-4 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable markets={product.markets} />
      </section>
    </div>
  );
}
