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
        <div className="">
          <h1 className="absolute left-44 m-2 p-11 text-pink-800 font-bold text-6xl">
            Note-Worthy
          </h1>
        </div>
        <div className="">
          <p className="absolute top-1/3 left-1/3 m-6 text-lg">
            For notes that are worth your time
          </p>
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
