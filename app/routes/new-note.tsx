import {
  ActionArgs,
  LoaderArgs,
  V2_MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { getSession, isSignedIn } from "~/utils/session.server";
import { createNote } from "~/utils/notes.server";
import { Form } from "@remix-run/react";

interface ActionData {
  errors?: string;
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy | Create Note" },
    { name: "description", content: "notes taker" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const signedIn = await isSignedIn(request);
  if (!signedIn) return redirect("/sign-up");
  return null;
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("userId");
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const noteRes = await createNote({
    title: title as string,
    content: content as string,
    username,
  });
  console.log(noteRes);
  if (!noteRes.success)
    return json<ActionData>({ errors: noteRes.message }, { status: 400 });
  return redirect("/my-notes");
}

export default function NewNote() {
  return (
    <div className="w-full box-border mt-10 flex flex-col items-center justify-center">
      <div className="w-[90vw] md:w-[40vw] flex flex-col">
        <Form
          method="post"
          className="p-5 rounded-2xl bg-gray-50 shadow-box-shadow"
        >
          <p>
            <label
              htmlFor="title"
              className="text-gray-600 text-xl font-semibold block text-center "
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="A name for your note please :)"
              className="w-full p-3 rounded-lg my-3 text-xs md:text-base"
              required
            />
          </p>
          <p>
            <label
              htmlFor="content"
              className="text-gray-600 text-xl font-semibold block text-center"
            >
              Content
            </label>
            <textarea
              name="content"
              rows={7}
              placeholder="What's your note about?"
              className="w-full p-3 rounded-lg my-3 text-xs  md:text-base"
              required
            />
          </p>
          <div>
            <button
              type="submit"
              className="p-2 rounded-lg text-gray-700 bg-gray-100 hover:text-gray-200 hover:bg-gray-700"
            >
              Add Note
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
