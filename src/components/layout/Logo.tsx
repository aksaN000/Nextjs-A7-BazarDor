import Image from "next/image";
import Link from "next/link";
import TodayDate from "../TodayDate";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-dark shadow-sm">
        <Image src="/logo-icon.png" alt="" width={22} height={22} priority className="brightness-0 invert" />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-bold text-ink">বাজার দর</span>
        <TodayDate className="block text-xs text-muted" />
      </span>
    </Link>
  );
}
