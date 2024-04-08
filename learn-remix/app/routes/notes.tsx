import { V2_MetaFunction, useLoaderData } from "@remix-run/react";
import { redirect, type ActionArgs } from "@remix-run/node";
import NewNote from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/helper";
import NoteList from "~/components/NoteList";

//action is a function that remix looks for (in this case for the post method)
//it is triggered when a non-GET request is recieved, for GET requests simply the component is returned
//this function willrun on the server NOT on the browser
//data object is destructured to get requests
export async function action({ request }: ActionArgs) {
  const formData = await request.formData(); //returns a promise
  const noteData = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

//loader function is triggered by remix when a GET request occurs
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy" },
    { name: "description", content: "note taking page" },
  ];
};

export default function NotePage() {
  const notes = useLoaderData(); //it is a hook which gives us access to data given by loader
  return (
    <div className="flex flex-col justify-between items-center mt-10">
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}
