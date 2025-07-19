// src/context/UsuarioContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioFirebaseDataSource } from "../infrastructure/UsuarioFirebaseDataSource";
import type { Usuario } from "../domain/Usuario";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UsuarioContextType {
  usuario: Usuario | null;
  loading: boolean;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const useUsuario = (): UsuarioContextType => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  }
  return context;
};

export const UsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const usuarioService = new UsuarioService(new UsuarioFirebaseDataSource());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const usuarioData = await usuarioService.obtenerUsuario(user.uid);
        setUsuario(usuarioData);
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, loading, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
