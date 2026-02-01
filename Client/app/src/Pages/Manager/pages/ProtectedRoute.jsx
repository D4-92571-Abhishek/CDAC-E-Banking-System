import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("token");

  // If not logged in then send to home page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // if logged in then allow access
  return <Outlet />;
}
