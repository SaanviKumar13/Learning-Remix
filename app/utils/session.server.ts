import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { User } from "@prisma/client";

export const { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "Notes",
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

export async function signUp(
  username: string,
  password: string,
): Promise<
  { success: true; data: { user: User } } | { success: false; error: string }
> {
  const existingUser = await db.user.findFirst({
    where: { username },
  });
  if (existingUser) {
    return { success: false, error: "User already exists" };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { username, password: passwordHash },
  });
  return { success: true, data: { user } };
}

export async function signIn(
  username: string,
  password: string,
): Promise<
  { success: false; error: string } | { success: true; data: { user: User } }
> {
  const user = await db.user.findUnique({ where: { username } });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return { success: false, error: "Incorrect password" };
  }
  return { success: true, data: { user } };
}

export async function isSignedIn(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
 return(!!session.has("userId"))
}

export async function signOut(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
