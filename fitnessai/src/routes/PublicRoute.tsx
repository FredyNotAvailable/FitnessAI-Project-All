import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Center, Spinner } from "@chakra-ui/react";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  // Mientras se verifica el estado de autenticación
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // Si ya hay sesión iniciada, redirige al dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no hay sesión, muestra la ruta pública (login, registro, etc.)
  return <>{children}</>;
}
