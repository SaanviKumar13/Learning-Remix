import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Note-Worthy" },
    { name: "description", content: "notes landing page" },
  ];
};

export default function Index() {
  return (
    <>
      <div>
        <h1 className="text-rose-300 font-bold text-3xl">Note-Worthy</h1>
        <p className="text-lg">For notes that are worth your time</p>
      </div>
    </>
  );
}
