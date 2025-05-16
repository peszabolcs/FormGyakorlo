import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import FormPage1 from "./components/FormPage1";
import FormPage2 from "./components/FormPage2";
import SummaryPage from "./components/SummaryPage";
import { LoginPage } from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
  component: () => (
    <ProtectedRoute>
      <FormPage1 />
    </ProtectedRoute>
  ),
});

const formPage2Route = new Route({
  getParentRoute: () => rootRoute,
  path: "/step2",
  component: () => (
    <ProtectedRoute>
      <FormPage2 />
    </ProtectedRoute>
  ),
});

const summaryPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/summary",
  component: () => (
    <ProtectedRoute>
      <SummaryPage />
    </ProtectedRoute>
  ),
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
    <App />
  </StrictMode>
);
