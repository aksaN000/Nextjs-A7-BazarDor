"use server";

import { db } from "./auth";

export type AccountInfo = {
  exists: boolean;
  hasPassword: boolean;
  socialProviders: string[];
};

const PROVIDER_NAMES: Record<string, string> = {
  google: "Google",
  github: "GitHub",
};

export async function lookupAccount(email: string): Promise<AccountInfo> {
  const user = await db.collection("user").findOne({ email: email.trim().toLowerCase() });
  if (!user) return { exists: false, hasPassword: false, socialProviders: [] };

  const accounts = await db
    .collection("account")
    .find({ userId: user._id }, { projection: { providerId: 1 } })
    .toArray();
  const providers = accounts.map((account) => String(account.providerId));

  return {
    exists: true,
    hasPassword: providers.includes("credential"),
    socialProviders: providers.filter((id) => id !== "credential").map((id) => PROVIDER_NAMES[id] ?? id),
  };
}
