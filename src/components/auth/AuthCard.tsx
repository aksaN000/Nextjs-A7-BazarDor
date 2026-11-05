import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">{children}</div>
      <Link
        href="/"
        className="mx-auto mt-6 flex w-fit items-center gap-1 text-sm text-muted hover:text-brand"
      >
        <FiArrowLeft /> হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
