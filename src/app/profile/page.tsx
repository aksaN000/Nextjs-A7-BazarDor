import { Avatar, buttonVariants } from "@heroui/react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import SignOutButton from "@/components/profile/SignOutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 last:border-0 sm:flex-row sm:justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=/profile");

  const { user } = session;
  const joined = new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }).format(new Date(user.createdAt));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl" color="success">
            {user.image && <Avatar.Image alt={user.name} src={user.image} />}
            <Avatar.Fallback className="text-xl">{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="mb-2 font-semibold">তথ্য</h2>
        <InfoRow label="নাম" value={user.name} />
        <InfoRow label="ইমেইল" value={user.email} />
        <InfoRow label="অ্যাকাউন্ট তৈরি" value={joined} />
        <Link
          href="/profile/update"
          className={`${buttonVariants({ variant: "primary", fullWidth: true })} mt-4 bg-brand-dark`}
        >
          <FiEdit2 /> আপডেট
        </Link>
      </div>
    </div>
  );
}
