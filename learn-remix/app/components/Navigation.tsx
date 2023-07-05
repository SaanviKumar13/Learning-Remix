import { NavLink } from "@remix-run/react";
//navlink is a special  kind of link which knows when it is active or pending
export default function Navigation() {
  return (
    <>
      <nav className="">
        <ul className="flex justify-center gap-10 m-11">
          <li className=" hover:text-pink-500 text-xl">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className=" hover:text-pink-500 text-xl">
            <NavLink to="/notes">My Notes</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
