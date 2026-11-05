"use client";

import { Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { setPasswordAction } from "@/app/profile/actions";
import PasswordField from "@/components/auth/PasswordField";
import { authErrorMessage } from "@/lib/auth-errors";

export default function SetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pass = String(formData.get("newPassword"));
    const confirm = String(formData.get("confirmNewPassword"));

    if (pass !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const result = await setPasswordAction(pass);
    setLoading(false);

    if (!result.ok) {
      toast.error(authErrorMessage({ code: result.code }, "পাসওয়ার্ড সেট করা যায়নি, আবার চেষ্টা করুন"));
      return;
    }

    toast.success("পাসওয়ার্ড সেট হয়েছে, এখন ইমেইল দিয়েও সাইন ইন করতে পারবেন");
    router.refresh();
  };

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <PasswordField
        name="newPassword"
        label="নতুন পাসওয়ার্ড"
        placeholder="কমপক্ষে ৮ অক্ষর"
        validate={(value) => (value.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null)}
      />
      <PasswordField name="confirmNewPassword" label="পাসওয়ার্ড নিশ্চিত করুন" placeholder="আবার লিখুন" />
      <Button type="submit" fullWidth isPending={loading} variant="outline">
        পাসওয়ার্ড সেট করুন
      </Button>
    </Form>
  );
}
