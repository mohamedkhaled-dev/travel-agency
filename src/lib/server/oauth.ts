"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function loginWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/signup`
  );

  return redirect(redirectUrl);
}
