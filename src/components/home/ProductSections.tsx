import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import { topMovers } from "@/lib/price";
import ProductGrid from "../product/ProductGrid";

function SectionTitle({ title, arrow, color }: { title: string; arrow?: string; color?: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold sm:text-2xl">
      {arrow && <span className={`text-base ${color}`}>{arrow}</span>}
      {title}
    </h2>
  );
}

export default async function ProductSections() {
  const products = await getProducts();
  const risers = topMovers(products, "up");
  const fallers = topMovers(products, "down");

  return (
    <>
      <section className="mt-10">
        <SectionTitle title="আজ দাম বেড়েছে" arrow="▲" color="text-down" />
        <ProductGrid products={risers} />
      </section>

      <section className="mt-10">
        <SectionTitle title="আজ দাম কমেছে" arrow="▼" color="text-up" />
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="mt-12 scroll-mt-48">
        <SectionTitle title="সব পণ্য" />
        <p className="-mt-3 mb-4 text-sm text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
