import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("token");

  // ❌ Not logged in → send to home page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in → allow access
  return <Outlet />;
}
