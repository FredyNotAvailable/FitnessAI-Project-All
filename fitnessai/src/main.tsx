// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth"; // tu provider de auth
import { UsuarioProvider } from "./context/UsuarioContext"; // el que creamos
import theme from "./app/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UsuarioProvider>
          <App />
        </UsuarioProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
