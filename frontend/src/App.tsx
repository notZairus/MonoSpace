import "./index.css";
import { lazy } from "react";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import TestingPage from "./pages/TestingPage";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/testing" element={<TestingPage />} />

        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedRoute>
              <Register />
            </UnauthenticatedRoute>
          }
        />

        <Route
          path="*"
          element={<h1 className="text-3xl font-bold">404 Not Found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
