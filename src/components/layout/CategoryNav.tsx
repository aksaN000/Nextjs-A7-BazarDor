"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid } from "react-icons/fi";
import type { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "সব পণ্য", icon: <FiGrid /> },
    ...categories.map((category) => ({
      href: `/category/${category.slug}`,
      label: category.nameBn,
      icon: category.icon,
    })),
  ];

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink hover:border-brand hover:text-brand"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
