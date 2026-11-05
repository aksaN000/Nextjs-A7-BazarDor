import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="" width={18} height={18} />
          <p>
            <span className="font-semibold text-brand">বাজার দর</span>
            <span className="text-muted"> | প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </p>
        </div>
        <p className="text-muted">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
