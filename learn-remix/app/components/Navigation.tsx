import { NavLink } from "@remix-run/react";
export default function Navigation() {
  return (
    <nav className="flex justify-center pt-10">
      <ul className="flex justify-center px-5 py-2 rounded-2xl text-center bg-gray-950 text-white w-fit gap-10">
        <li className="hover:text-slate-50 text-xl md:text-2xl lg:text-3xl">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-slate-50 text-xl md:text-2xl lg:text-3xl">
          <NavLink to="/notes">My Notes</NavLink>
        </li>
      </ul>
    </nav>
  );
}
