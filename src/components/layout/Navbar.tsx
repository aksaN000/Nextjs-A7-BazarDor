import { getCategories, getProducts } from "@/lib/api";
import AuthButtons from "./AuthButtons";
import CategoryNav from "./CategoryNav";
import Logo from "./Logo";
import PriceTicker from "./PriceTicker";

export default async function Navbar() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <AuthButtons />
        </div>
        <div className="mt-3 pb-3">
          <CategoryNav categories={categories} />
        </div>
      </div>
      <PriceTicker products={products} />
    </header>
  );
}
