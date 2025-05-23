import {
  createRootRoute,
  createRouter,
  Outlet,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { LoginPage } from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import FormPage1 from "./components/FormPage1";
import FormPage2 from "./components/FormPage2";
import SummaryPage from "./components/SummaryPage";
import { isSessionValid } from "./utils/sessionManager";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const formPage1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/step1",
  component: () => (
    <ProtectedRoute>
      <FormPage1 />
    </ProtectedRoute>
  ),
});

const formPage2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/step2",
  component: () => (
    <ProtectedRoute>
      <FormPage2 />
    </ProtectedRoute>
  ),
});

const summaryPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/summary",
  component: () => (
    <ProtectedRoute>
      <SummaryPage />
    </ProtectedRoute>
  ),
});

// Index route to handle the root path
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    // Check if user is authenticated
    if (isSessionValid()) {
      // If authenticated, redirect to step1
      throw redirect({
        to: "/step1",
      });
    } else {
      // If not authenticated, redirect to login
      throw redirect({
        to: "/login",
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  formPage1Route,
  formPage2Route,
  summaryPageRoute,
]);

export const router = createRouter({ routeTree });
