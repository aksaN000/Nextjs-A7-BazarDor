"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function setPasswordAction(newPassword: string) {
  try {
    await auth.api.setPassword({
      body: { newPassword },
      headers: await headers(),
    });
    return { ok: true as const };
  } catch (error) {
    const code = error instanceof APIError ? (error.body?.code as string | undefined) : undefined;
    return { ok: false as const, code };
  }
}
