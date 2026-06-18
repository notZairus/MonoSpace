import { useAuth } from "@clerk/react";
import { Navigate } from "react-router";
import { Watch } from "react-loader-spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded)
    return (
      <div className="flex flex-col space-y-4 items-center justify-center h-screen">
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#00087a"
          ariaLabel="watch-loading"
        />

        <p className="text-primary">Loading...</p>
      </div>
    ); // or a loader

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
