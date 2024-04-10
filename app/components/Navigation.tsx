import { Form, NavLink, useLoaderData } from "@remix-run/react";
export default function Navigation() {
  const signedIn = useLoaderData();
  return (
    <nav className="flex justify-center items-center pt-10">
      <ul className="flex justify-evenly items-center px-5 py-2 rounded-2xl text-center bg-gray-900 text-white w-[70vw] md:w-fit gap-2 md:gap-10">
        <li className="hover:text-slate-500 text-xs md:text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-slate-500 text-xs md:text-lg">
          <NavLink to="/new-note">Create Note</NavLink>
        </li>
        <li className="hover:text-slate-500 text-xs md:text-lg">
          <NavLink to="/my-notes">My Notes</NavLink>
        </li>
        {signedIn && (
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="hover:text-slate-500 text-xs md:text-lg"
            >
              Logout
            </button>
          </Form>
        )}
      </ul>
    </nav>
  );
}
