import type { RespuestasSetup } from "../hooks/useSetupFlow";
import { aiRepository } from "../infrastructure/aiRepository";

export interface PlanGenerado {
  rutina: string;
  alimentacion: string;
}

export const aiService = {
  async generarPlanUsuario(respuestas: RespuestasSetup): Promise<PlanGenerado> {
    const prompt = construirPrompt(respuestas);
    const respuestaIA = await aiRepository.enviarPrompt(prompt);

    // Separar rutina y alimentación con manejo seguro
    let rutina = respuestaIA;
    let alimentacion = "";

    const splitIndex = respuestaIA.indexOf("### Alimentación:");
    if (splitIndex !== -1) {
      rutina = respuestaIA.substring(0, splitIndex).trim();
      alimentacion = respuestaIA.substring(splitIndex + "### Alimentación:".length).trim();
    }

    return {
      rutina,
      alimentacion: alimentacion || "No se pudo generar un plan de alimentación.",
    };
  },

  // Nuevo método para responder mensajes generales (chat)
  async enviarMensajeAI(mensaje: string): Promise<string> {
    try {
      const respuesta = await aiRepository.enviarPrompt(mensaje);
      return respuesta;
    } catch (error) {
      console.error("Error en enviarMensajeAI:", error);
      return "❌ Error al procesar tu mensaje, intenta nuevamente.";
    }
  }
};

const construirPrompt = (r: RespuestasSetup): string => `
Eres un entrenador personal AI.

Con base en los siguientes datos del usuario:

Objetivo: ${r.objetivo}
Nivel: ${r.nivel}
Días por semana para entrenar: ${r.dias}
Restricciones alimenticias: ${r.restricciones || "Ninguna"}
Tiene acceso a gimnasio: ${r.gimnasio ? "Sí" : "No"}

👉 Genera una rutina semanal adaptada a ese perfil.
Incluye ejercicios específicos, días de entrenamiento, repeticiones y descansos.

### Alimentación:
Sugiere un menú diario base (desayuno, almuerzo, cena y snack), adecuado al objetivo y restricciones.

Responde en texto plano, fácil de leer, como si fueras un coach motivador.
`;

// Tipo para mensajes (puedes importar este tipo desde el componente chat si quieres)
export type MessageType = { id: number; text: string; isTip?: boolean };

export const generarPlanDesdeIA = async (
  respuestas: RespuestasSetup,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
) => {
  try {
    const plan = await aiService.generarPlanUsuario(respuestas);

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: `🏋️ Rutina:\n${plan.rutina}`,
        isTip: true,
      },
      {
        id: prev.length + 2,
        text: `🍽️ Alimentación:\n${plan.alimentacion}`,
        isTip: true,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: "❌ Ocurrió un error al generar tu plan. Intenta de nuevo.",
        isTip: true,
      },
    ]);
  }
};
