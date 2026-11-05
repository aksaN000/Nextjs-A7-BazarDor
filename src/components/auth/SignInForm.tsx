"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import PasswordField from "./PasswordField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const callbackURL = redirect?.startsWith("/") ? redirect : "/";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (redirect) {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
    }
  }, [redirect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackURL);
    router.refresh();
  };

  return (
    <>
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField isRequired name="email" type="email">
          <Label>ইমেইল</Label>
          <Input placeholder="you@example.com" />
          <FieldError />
        </TextField>
        <PasswordField name="password" label="পাসওয়ার্ড" placeholder="কমপক্ষে ৮ অক্ষর" />
        <Button type="submit" fullWidth isPending={loading} className="bg-brand-dark">
          সাইন ইন
        </Button>
      </Form>
      <SocialButtons callbackURL={callbackURL} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
