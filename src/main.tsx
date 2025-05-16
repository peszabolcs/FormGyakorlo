import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import FormPage1 from "./routes/FormPage1";
import FormPage2 from "./routes/FormPage2";
import SummaryPage from "./routes/SummaryPage";
import LoginPage from "./routes/LoginPage";
import {
  RouterProvider,
  createRouter,
  RootRoute,
  Route,
} from "@tanstack/react-router";
import "./i18n";

//root route
const rootRoute = new RootRoute({
  component: App,
});

//child routes
const loginPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const formPage1Route = new Route({
  getParentRoute: () => rootRoute,
  path: "/step1",
  component: FormPage1,
});

const formPage2Route = new Route({
  getParentRoute: () => rootRoute,
  path: "/step2",
  component: FormPage2,
});

const summaryPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/summary",
  component: SummaryPage,
});

//route tree
const routeTree = rootRoute.addChildren([
  loginPageRoute,
  formPage1Route,
  formPage2Route,
  summaryPageRoute,
]);

//router instance
const router = createRouter({ routeTree, defaultPreload: "intent" });

// Redirect root ("/") to /login
router.navigate({ to: "/login" });

//render
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
