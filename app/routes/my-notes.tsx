import {
  ActionArgs,
  LoaderArgs,
  V2_MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { deleteNote, getNotes } from "~/utils/notes.server";
import { isSignedIn, getSession } from "~/utils/session.server";

export type Note = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export interface NoteType {
  notes: Note[];
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy | My-Notes" },
    { name: "description", content: "notes taker" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const signedIn = await isSignedIn(request);
  if (!signedIn) return redirect("/sign-up");
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("userId");
  const notes = await getNotes(username);
  return notes.data;
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("userId");
  const formData = await request.formData();
  const id = formData.get("noteId") as string;
  const noteRes = await deleteNote({ id, username });

  return redirect("/my-notes");
}

export default function NoteList() {
  const notes = useLoaderData();

  return (
    <div className="flex flex-row gap-5 flex-wrap items-center justify-center m-5">
      {notes.length === 0 ? (
        <div className="flex flex-col min-h-[70vh] h-full gap-10 items-center justify-center">
          <h1 className="text-xl">No notes yet, create a note.</h1>
          <button className="group relative inline-block font-mono text-lg">
            <span className="relative z-10 block overflow-hidden rounded-lg border border-gray-900 px-5 py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:border-transparent group-hover:text-white">
              <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-5 py-3"></span>
              <span className="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-gradient-to-br from-gray-500 to-gray-900 transition-all duration-300 group-hover:-rotate-180"></span>
              <Link to="/new-note" className="relative">
                Take Notes
              </Link>
            </span>
            <span
              className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-gray-900 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0 group-hover:bg-transparent"
              data-rounded="rounded-lg"
            ></span>
          </button>
        </div>
      ) : (
        notes.map((note: Note, index: number) => (
          <div
            key={index}
            className="bg-gray-100 h-44 overflow-y-scroll w-[80vw] md:w-[40vw] lg:w-[35vw] p-5 rounded-lg m-2"
          >
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-800 text-center font-semibold text-xl">
                {note.title}
              </h1>
              <Form method="post">
                <input type="text" name="noteId" value={note.id} hidden />
                <button type="submit">
                  <img src="bin-icon.svg" alt="delete" className="w-5 h-5" />
                </button>
              </Form>
            </div>
            <p className="font-extralight text-gray-800">{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
