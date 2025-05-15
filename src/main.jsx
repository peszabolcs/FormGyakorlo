import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FormPage1 from "./routes/FormPage1";
import FormPage2 from "./routes/FormPage2";
import SummaryPage from "./routes/SummaryPage";
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
const formPage1Route = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
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
  formPage1Route,
  formPage2Route,
  summaryPageRoute,
]);

//router instance
const router = createRouter({ routeTree });

// Register the router
router.history.subscribe(() => {
  // This ensures the router is properly initialized
});

//render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
