"use client";

import Image from "next/image";
import Link from "next/link";
import { banglaDate } from "@/lib/format";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft ring-1 ring-brand/20">
        <Image src="/logo-icon.png" alt="" width={22} height={22} priority />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-bold text-brand">বাজার দর</span>
        <span className="block text-xs text-muted" suppressHydrationWarning>
          {banglaDate()}
        </span>
      </span>
    </Link>
  );
}
