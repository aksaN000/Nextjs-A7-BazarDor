import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SortedProducts from "@/components/category/SortedProducts";
import NotFoundState from "@/components/NotFoundState";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn} | বাজার দর` : "পাওয়া যায়নি | বাজার দর" };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <NotFoundState
        title="এই বিভাগে কোনো পণ্য নেই"
        message="এই বিভাগে এখনো কোনো পণ্য যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-mint text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <SortedProducts products={products} />
    </div>
  );
}
