import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { useSearchParams, useActionData, Form, Link } from "@remix-run/react";
import * as React from "react";
import { useEffect, useRef } from "react";
import { getUserId, createUserSession, signIn } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  // const existingUser = await getUserByEmail(email);
  // if (existingUser) {
  //   return json<ActionData>(
  //     { errors: { email: "A user already exists with this email" } },
  //     { status: 400 }
  //   );
  // }

  const user = await signIn(username as string, password);
  return null;
};

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="username"
                required
                autoFocus={true}
                name="username"
                type="username"
                autoComplete="username"
                // aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {/* {actionData?.errors?.username && (
                <div className="pt-1 text-red-700" id="username-error">
                  {actionData.errors.username}
                </div>
              )} */}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-gray
            -500  py-2 px-4 text-white hover:bg-gray
            -600 focus:bg-gray
            -400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-gray
                -500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
