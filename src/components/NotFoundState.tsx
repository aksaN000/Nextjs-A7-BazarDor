import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  title?: string;
  message?: string;
};

export default function NotFoundState({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।",
}: Props) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <p className="text-7xl font-bold text-brand sm:text-8xl">৪০৪</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted">{message}</p>
      <Link href="/" className={`${buttonVariants({ variant: "primary" })} mt-6 bg-brand-dark`}>
        <FiArrowLeft /> হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
