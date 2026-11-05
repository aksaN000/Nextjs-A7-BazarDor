"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={category.slug}
            href={href}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? "bg-brand-dark text-white shadow-sm" : "text-ink hover:bg-mint hover:text-brand"
            }`}
          >
            <span className="text-base">{category.icon}</span>
            {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
