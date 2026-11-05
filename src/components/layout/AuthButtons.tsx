"use client";

import { Avatar, buttonVariants, Dropdown, Label, Skeleton } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut, FiUser } from "react-icons/fi";
import { signOut, useSession } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          সাইন ইন
        </Link>
        <Link href="/signup" className={buttonVariants({ variant: "primary", size: "sm" })}>
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  const handleAction = async (key: React.Key) => {
    if (key === "profile") {
      router.push("/profile");
      return;
    }
    if (key === "signout") {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 hover:border-brand">
        <Avatar size="sm" color="success">
          {user.image && <Avatar.Image alt={user.name} src={user.image} />}
          <Avatar.Fallback>{user.name?.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">{user.name}</span>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="bottom end">
        <div className="border-b border-line px-3 py-2">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-muted">{user.email}</p>
        </div>
        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Item id="profile" textValue="আমার প্রোফাইল">
            <FiUser />
            <Label>আমার প্রোফাইল</Label>
          </Dropdown.Item>
          <Dropdown.Item id="signout" textValue="সাইন আউট" variant="danger">
            <FiLogOut />
            <Label>সাইন আউট</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
