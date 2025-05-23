import { createAdminClient, storeUserData } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  // Store user data in the database
  console.log("Appwrite Session:", session);

  const cookieStore = await cookies();
  const expireDate = new Date(session.expire);
  const maxAge = Math.floor((expireDate.getTime() - Date.now()) / 1000);
  cookieStore.set("session", session.secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAge,
  });

  await storeUserData();
  return NextResponse.redirect(`${request.nextUrl.origin}`);
}
