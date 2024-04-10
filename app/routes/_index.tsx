import { type V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Player } from "@lottiefiles/react-lottie-player";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy" },
    { name: "description", content: "notes taker" },
  ];
};

export default function Index() {
  return (
    <div className="w-screen box-border flex flex-col md:flex-row justify-center md:justify-evenly items-center p-10">
      <div className="flex flex-col items-center md:items-start justify-center gap-4">
        <h1 className="text-gray-800 text-center md:text-left font-bold text-xl md:text-4xl lg:text-5xl md:w-96">
          Collect Your Thought's.
        </h1>
        <p className="text-center md:text-left text-sm lg:text-3xl">
          Take notes the simple way
        </p>
        <button className="group relative inline-block font-mono text-lg">
          <span className="relative z-10 block overflow-hidden rounded-lg border border-gray-900 px-2 py-1 md:px-5 md:py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:border-transparent group-hover:text-white">
            <span className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 px-2 py-1 md:px-5 md:py-3"></span>
            <span className="ease absolute left-0 -ml-2 h-24 w-24 md:h-48 md:w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-gradient-to-br from-gray-500 to-gray-900 transition-all duration-300 group-hover:-rotate-180"></span>
            <Link to="/new-note" className="relative">
              Take Notes
            </Link>
          </span>
          <span
            className="absolute bottom-0 right-0 -mb-1 -mr-1 h-8 md:h-12 w-full rounded-lg bg-gray-900 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0 group-hover:bg-transparent"
            data-rounded="rounded-lg"
          ></span>
        </button>
      </div>
      <div>
        <Player
          autoplay
          loop
          src="https://lottie.host/5e49e9dc-40fc-4c5c-8b9e-36f7b9efdf0e/Q0MNRlw86x.json"
          className="w-72 h-72 md:w-96 md:h-96"
        />
      </div>
    </div>
  );
}
