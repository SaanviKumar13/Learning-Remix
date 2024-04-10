import { Form, NavLink, useLoaderData } from "@remix-run/react";
export default function Navigation() {
  const signedIn = useLoaderData();
  return (
    <nav className="flex justify-center pt-10">
      <ul className="flex justify-center px-5 py-2 rounded-2xl text-center bg-gray-900 text-white w-fit gap-10">
        <li className="hover:text-slate-50 text-xl">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-slate-50 text-xl">
          <NavLink to="/new-note">Create Note</NavLink>
        </li>
        <li className="hover:text-slate-50 text-xl">
          <NavLink to="/my-notes">My Notes</NavLink>
        </li>
        {signedIn && (
          <Form action="/logout" method="post">
            <button type="submit" className="hover:text-slate-50 text-xl">
              Logout
            </button>
          </Form>
        )}
      </ul>
    </nav>
  );
}
