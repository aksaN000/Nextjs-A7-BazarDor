"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handleSocial = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন করা যায়নি");
      setLoading(null);
    }
  };

  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          variant="outline"
          isPending={loading === "google"}
          isDisabled={loading !== null}
          onPress={() => handleSocial("google")}
        >
          <FcGoogle /> Google দিয়ে চালিয়ে যান
        </Button>
        <Button
          variant="outline"
          isPending={loading === "github"}
          isDisabled={loading !== null}
          onPress={() => handleSocial("github")}
        >
          <FaGithub /> GitHub দিয়ে চালিয়ে যান
        </Button>
      </div>
    </>
  );
}
