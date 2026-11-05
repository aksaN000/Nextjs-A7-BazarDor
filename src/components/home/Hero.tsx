import { buttonVariants } from "@heroui/react";
import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";
import TodayDate from "../TodayDate";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-line bg-white p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="text-center md:text-left">
          <TodayDate className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark ring-1 ring-brand/20" />
          <h1 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-muted sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম। বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className={`${buttonVariants({ variant: "primary" })} mt-6 bg-brand-dark sm:h-11 sm:px-6`}
          >
            সব পণ্য দেখুন <FiArrowDown />
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="সবজি ও ফলের ঝুড়ি"
            width={320}
            height={270}
            priority
            className="h-auto w-56 sm:w-72"
          />
        </div>
      </div>
    </section>
  );
}
