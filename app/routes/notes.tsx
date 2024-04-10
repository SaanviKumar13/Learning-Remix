import { V2_MetaFunction } from "@remix-run/react";
import { LoaderArgs, redirect } from "@remix-run/node";
import NewNote from "~/components/NewNote";
import { isSignedIn } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const signedIn = await isSignedIn(request);
  if (!signedIn) return redirect("/sign-up");
  return null;
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy" },
    { name: "description", content: "note taking page" },
  ];
};

export default function NotePage() {
  return (
    <div className="flex flex-col justify-between items-center mt-10">
      <NewNote />
      {/* <NoteList notes={notes} /> */}
    </div>
  );
}
