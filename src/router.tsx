import {
  createRootRoute,
  createRouter,
  Outlet,
  createRoute,
} from "@tanstack/react-router";
import { LoginPage } from "./components/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import FormPage1 from "./components/FormPage1";
import FormPage2 from "./components/FormPage2";
import SummaryPage from "./components/SummaryPage";

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

const routeTree = rootRoute.addChildren([
  loginRoute,
  formPage1Route,
  formPage2Route,
  summaryPageRoute,
]);

export const router = createRouter({ routeTree });
