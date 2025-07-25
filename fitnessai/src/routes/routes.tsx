import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LoginPage from "../ui/pages/LoginPage";
import RegisterPage from "../ui/pages/RegisterPage";
import { ChatPage } from "../ui/pages/ChatPage";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/login" replace /> },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/chat",
    element: <PrivateRoute />,
    children: [
      { path: "", element: <ChatPage /> },
      // Puedes agregar aquí las otras secciones del registro diario conforme las vayas creando
    ],
  },
];
