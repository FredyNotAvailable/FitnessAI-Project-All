const API_URL = "http://localhost:3000/api/ai"; // Cambia por la URL real de tu backend

export const aiRepository = {
  async enviarPrompt(prompt: string): Promise<string> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        // Extraer posible mensaje de error del backend
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.message || "Error al comunicarse con el modelo AI";
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // Esperamos que el backend devuelva { respuesta: string }
      if (!data.respuesta) {
        throw new Error("Respuesta inválida del servidor");
      }

      return data.respuesta;
    } catch (error: any) {
      console.error("AI Error:", error);
      return "Ocurrió un error al generar el plan. Por favor intenta nuevamente.";
    }
  },
};
