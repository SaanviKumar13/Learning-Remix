import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/globals.css";
import Navigation from "./components/Navigation";
import { isSignedIn } from "./utils/session.server";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const signedIn = await isSignedIn(request);
  return signedIn;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <div className="font-mono min-h-screen h-full bg-waves bg-no-repeat bg-cover w-full">
        <header>
          <Navigation />
        </header>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </div>
    </html>
  );
}
