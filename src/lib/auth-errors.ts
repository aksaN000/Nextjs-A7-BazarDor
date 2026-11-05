const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড সঠিক নয়",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
  PASSWORD_ALREADY_SET: "এই অ্যাকাউন্টে আগেই পাসওয়ার্ড সেট করা আছে",
  SESSION_NOT_FRESH: "নিরাপত্তার জন্য আবার সাইন ইন করে চেষ্টা করুন",
  INVALID_EMAIL: "সঠিক ইমেইল লিখুন",
};

const HINTS: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD:
    "আপনি যদি Google বা GitHub দিয়ে অ্যাকাউন্ট খুলে থাকেন, তাহলে নিচের Google বা GitHub বাটন দিয়ে সাইন ইন করুন। পরে প্রোফাইল থেকে পাসওয়ার্ড সেট করে নিলে ইমেইল দিয়েও ঢুকতে পারবেন।",
  USER_ALREADY_EXISTS:
    "সাইন ইন পাতায় গিয়ে ঢুকুন। Google বা GitHub দিয়ে অ্যাকাউন্ট খুলে থাকলে সেই বাটন ব্যবহার করুন।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "সাইন ইন পাতায় গিয়ে ঢুকুন। Google বা GitHub দিয়ে অ্যাকাউন্ট খুলে থাকলে সেই বাটন ব্যবহার করুন।",
};

export function authErrorMessage(error: { code?: string; message?: string }, fallback: string) {
  return (error.code && MESSAGES[error.code]) || fallback;
}

export function authErrorHint(error: { code?: string }) {
  return (error.code && HINTS[error.code]) || null;
}
