import type { AccountInfo } from "./account-lookup";

const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
  PASSWORD_ALREADY_SET: "এই অ্যাকাউন্টে আগেই পাসওয়ার্ড সেট করা আছে",
  SESSION_NOT_FRESH: "নিরাপত্তার জন্য আবার সাইন ইন করে চেষ্টা করুন",
  INVALID_EMAIL: "সঠিক ইমেইল লিখুন",
};

export function authErrorMessage(error: { code?: string; message?: string }, fallback: string) {
  return (error.code && MESSAGES[error.code]) || fallback;
}

export type Hint = { title: string; message: string; link?: { href: string; label: string } };

export function signInHint(account: AccountInfo): Hint | null {
  if (!account.exists) {
    return {
      title: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই",
      message: "ইমেইলটি ঠিক আছে কিনা দেখুন, অথবা নতুন অ্যাকাউন্ট খুলুন।",
      link: { href: "/signup", label: "সাইন আপ করুন" },
    };
  }
  if (!account.hasPassword) {
    const via = account.socialProviders.join(" / ") || "Google বা GitHub";
    return {
      title: `এই অ্যাকাউন্টটি ${via} দিয়ে খোলা হয়েছে`,
      message: `এতে কোনো পাসওয়ার্ড নেই। নিচের ${via} বাটন দিয়ে সাইন ইন করুন। চাইলে পরে প্রোফাইল থেকে পাসওয়ার্ড সেট করে নিতে পারবেন।`,
    };
  }
  return null;
}

export function signUpHint(account: AccountInfo): Hint {
  if (!account.hasPassword) {
    const via = account.socialProviders.join(" / ") || "Google বা GitHub";
    return {
      title: `এই ইমেইল দিয়ে আগেই ${via} অ্যাকাউন্ট আছে`,
      message: `নতুন অ্যাকাউন্ট খোলার দরকার নেই। নিচের ${via} বাটন দিয়ে সাইন ইন করুন, তারপর প্রোফাইল থেকে পাসওয়ার্ড সেট করুন।`,
    };
  }
  return {
    title: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে",
    message: "সাইন ইন পাতায় গিয়ে আপনার পাসওয়ার্ড দিয়ে ঢুকুন।",
    link: { href: "/signin", label: "সাইন ইন পাতায় যান" },
  };
}
