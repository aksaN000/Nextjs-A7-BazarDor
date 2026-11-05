"use client";

import { type Key, Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";
import { toBn } from "@/lib/format";
import type { Product } from "@/lib/types";
import ProductGrid from "../product/ProductGrid";

const SORT_OPTIONS = [
  { id: "default", label: "ডিফল্ট" },
  { id: "asc", label: "দাম: কম থেকে বেশি" },
  { id: "desc", label: "দাম: বেশি থেকে কম" },
];

function sortProducts(products: Product[], sortBy: Key) {
  if (sortBy === "asc") return [...products].sort((a, b) => a.today - b.today);
  if (sortBy === "desc") return [...products].sort((a, b) => b.today - a.today);
  return products;
}

export default function SortedProducts({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<Key>("default");
  const sorted = sortProducts(products, sortBy);

  return (
    <>
      <div className="mb-4 flex items-center justify-end rounded-2xl border border-line bg-white px-4 py-3">
        <Select
          className="!flex-row items-center gap-3"
          value={sortBy}
          onChange={(value) => setSortBy((value as Key) ?? "default")}
          aria-label="সাজান"
        >
          <Label className="shrink-0 text-sm text-muted">সাজান</Label>
          <Select.Trigger className="min-w-44 sm:min-w-52">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {SORT_OPTIONS.map((option) => (
                <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <p className="mb-4 text-sm text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </>
  );
}
