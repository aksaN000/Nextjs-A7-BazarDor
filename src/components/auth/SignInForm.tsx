"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { lookupAccount } from "@/lib/account-lookup";
import { authErrorMessage, type Hint, signInHint } from "@/lib/auth-errors";
import FormHint from "./FormHint";
import PasswordField from "./PasswordField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const callbackURL = redirect?.startsWith("/") ? redirect : "/";
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<Hint | null>(null);

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
    setHint(null);
    const { error } = await signIn.email({ email, password });

    if (error) {
      const accountHint =
        error.code === "INVALID_EMAIL_OR_PASSWORD" ? signInHint(await lookupAccount(email)) : null;
      setLoading(false);
      toast.error(accountHint?.title ?? authErrorMessage(error, "সাইন ইন করা যায়নি, আবার চেষ্টা করুন"));
      setHint(accountHint);
      return;
    }
    setLoading(false);

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
        {hint && <FormHint title={hint.title} message={hint.message} link={hint.link} />}
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
