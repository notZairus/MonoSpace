import { useAuth } from "@clerk/react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
