import { Form, Link, useActionData } from "@remix-run/react";
import { createUserSession, getSession, signIn } from "~/utils/session.server";
import {
  redirect,
  json,
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy | Login" },
    { name: "description", content: "notes taker" },
  ];
};

interface ActionData {
  errors?: string;
}
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: "Password is required" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: "Password is too short" },
      { status: 400 }
    );
  }

  const userId = await signIn(username as string, password);

  if (!userId.success) {
    return json<ActionData>({ errors: userId.error }, { status: 400 });
  }

  return await createUserSession(username as string, "/notes");
};
export default function LoginPage() {
  const actionData = useActionData();

  return (
    <div className="flex min-h-[70vh] h-full flex-col justify-center items-center">
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
                id="username"
                required
                autoFocus={true}
                name="username"
                type="username"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
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
                name="password"
                type="password"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          {actionData?.errors && (
            <div className="pt-1 text-red-700">{actionData.errors}</div>
          )}
          <input type="hidden" name="redirectTo" value="/notes" />
          <button
            type="submit"
            className="w-full rounded bg-gray-500  py-2 px-4 text-white hover:bg-gray-600 focus:bg-gray-400"
          >
            Log in
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link className="text-gray-500 underline" to="/sign-up">
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
