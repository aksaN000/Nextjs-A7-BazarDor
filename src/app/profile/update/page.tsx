import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "তথ্য আপডেট | বাজার দর",
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile/update");

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Link href="/profile" className="mb-4 flex w-fit items-center gap-1 text-sm text-muted hover:text-brand">
        <FiArrowLeft /> প্রোফাইলে ফিরে যান
      </Link>
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-muted">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>
      <div className="mt-6 rounded-2xl border border-line bg-white p-5">
        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </div>
  );
}
