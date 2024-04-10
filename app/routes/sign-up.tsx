import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
} from "@remix-run/node";
import { useActionData, Form, Link, V2_MetaFunction } from "@remix-run/react";
import { createUserSession, getSession, signUp } from "~/utils/session.server";
export const config = { runtime: "edge" };
interface ActionData {
  errors: string;
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy | Sign-Up" },
    { name: "description", content: "notes taker" },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/notes");
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

  const userId = await signUp(username as string, password as string);
  if (!userId.success) {
    return json<ActionData>({ errors: userId.error }, { status: 400 });
  }
  return await createUserSession(username as string, "/my-notes");
};

export default function SignUp() {
  const actionData = useActionData() as ActionData;

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
                id="password"
                name="password"
                type="password"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          {actionData?.errors && (
            <div className="pt-1 text-red-700">{actionData.errors}</div>
          )}
          <input type="hidden" name="redirectTo" />
          <button
            type="submit"
            className="w-full rounded bg-gray-500  py-2 px-4 text-white hover:bg-gray-600 focus:bg-gray-400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link className="text-gray-500 underline" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
