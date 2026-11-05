"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import PasswordField from "./PasswordField";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email"));
    const pass = String(formData.get("password"));
    const confirm = String(formData.get("confirmPassword"));

    if (pass !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password: pass });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error, "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"));
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <>
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField isRequired name="name">
          <Label>নাম</Label>
          <Input placeholder="যেমন: রহিম উদ্দিন" />
          <FieldError />
        </TextField>
        <TextField isRequired name="email" type="email">
          <Label>ইমেইল</Label>
          <Input placeholder="you@example.com" />
          <FieldError />
        </TextField>
        <PasswordField
          name="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          validate={(value) => (value.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null)}
        />
        <PasswordField name="confirmPassword" label="পাসওয়ার্ড নিশ্চিত করুন" placeholder="আবার লিখুন" />
        <Button type="submit" fullWidth isPending={loading} className="bg-brand-dark">
          অ্যাকাউন্ট তৈরি করুন
        </Button>
      </Form>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
