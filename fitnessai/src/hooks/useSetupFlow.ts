import { useState } from "react";

export type Paso =
  | "objetivo"
  | "nivel"
  | "dias"
  | "restricciones"
  | "gimnasio"
  | "completo";

export interface RespuestasSetup {
  objetivo: string;
  nivel: string;
  dias: number;
  restricciones: string;
  gimnasio: boolean;
}

export const useSetupFlow = () => {
  const [pasoActual, setPasoActual] = useState<Paso>("objetivo");

  const [respuestas, setRespuestas] = useState<Partial<RespuestasSetup>>({});

  const avanzarPaso = (respuesta: string | number | boolean) => {
    setRespuestas((prev) => {
      const nuevo = { ...prev };

      switch (pasoActual) {
        case "objetivo":
          nuevo.objetivo = String(respuesta);
          setPasoActual("nivel");
          break;
        case "nivel":
          nuevo.nivel = String(respuesta);
          setPasoActual("dias");
          break;
        case "dias":
          nuevo.dias = Number(respuesta);
          setPasoActual("restricciones");
          break;
        case "restricciones":
          nuevo.restricciones = String(respuesta);
          setPasoActual("gimnasio");
          break;
        case "gimnasio":
          nuevo.gimnasio = Boolean(respuesta);
          setPasoActual("completo");
          break;
      }

      return nuevo;
    });
  };

  const resetSetup = () => {
    setPasoActual("objetivo");
    setRespuestas({});
  };

  const setupCompleto = pasoActual === "completo";

  return {
    pasoActual,
    respuestas,
    avanzarPaso,
    setupCompleto,
    resetSetup,
  };
};
