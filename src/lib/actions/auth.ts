"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";

export async function googleSignInAction() {
  await signIn("google", {
    redirectTo: DEFAULT_REDIRECT,
    redirect: true,
  });
}