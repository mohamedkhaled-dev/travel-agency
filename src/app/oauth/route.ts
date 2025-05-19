import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  console.log("Appwrite Session:", session);

  const cookieStore = await cookies();
  const expireDate = new Date(session.expire);
  const maxAge = Math.floor((expireDate.getTime() - Date.now()) / 1000);
  cookieStore.set("session", session.secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: maxAge,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}`);
}
