import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy" },
    { name: "description", content: "notes landing page" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="text-center m-2 text-pink-800 font-bold text-5xl md:text-6xl lg:text-8xl">
          Note-Worthy
        </h1>
        <p className="text-center text-lg m-3 lg:text-3xl">
          For notes that are worth your time
        </p>
        <div>
          <img
            src="note.png"
            alt="notes"
            className="absolute w-96 left-2 md:left-1/3"
          />
        </div>
        {/* <div>
          <Link to="notes">
            <button
              type="button"
              className="py-3 px-4 rounded-md bg-pink-700 font-semibold text-white hover:text-pink-400 hover:bg-pink-100 "
            >
              Lets take notes!
            </button>
          </Link>
        </div> */}
      </div>
    </>
  );
}
