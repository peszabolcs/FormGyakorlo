import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { isSessionValid } from "../utils/sessionManager";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  // Ne ellenőrizzük újra a render fázisban, csak a useEffect-ben navigáljunk
  return <>{children}</>;
};
