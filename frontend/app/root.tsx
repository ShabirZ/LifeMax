import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import LandingPage from "./routes/LandingPage"



export default function Root() {
  return <LandingPage/>;
}

