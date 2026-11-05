"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name")).trim();

    if (name === currentName) {
      toast("নামে কোনো পরিবর্তন হয়নি");
      return;
    }

    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField
        isRequired
        name="name"
        defaultValue={currentName}
        validate={(value) => (value.trim().length < 2 ? "নাম কমপক্ষে ২ অক্ষরের হতে হবে" : null)}
      >
        <Label>নাম</Label>
        <Input placeholder="যেমন: রহিম উদ্দিন" />
        <FieldError />
      </TextField>
      <Button type="submit" fullWidth isPending={loading} className="bg-brand-dark">
        তথ্য আপডেট করুন
      </Button>
    </Form>
  );
}
