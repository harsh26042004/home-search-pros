import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "@/lib/storage";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAdminLoggedIn()) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
