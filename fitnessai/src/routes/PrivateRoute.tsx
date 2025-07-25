import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
