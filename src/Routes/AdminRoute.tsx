import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const adminToken = localStorage.getItem("admin_jwt");

  // ❌ Not logged in
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
