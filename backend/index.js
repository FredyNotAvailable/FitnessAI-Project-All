require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

app.post("/api/ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  }

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: [
{
  role: "system",
content: `
Eres un entrenador personal especializado exclusivamente en fitness. Solo puedes responder a temas relacionados con ejercicio físico, alimentación saludable, hidratación, sueño y motivación relacionada con el entrenamiento. No uses emojis en tus respuestas.

Cuando el usuario pida una rutina, consejo o explicación, responde en un formato claro y legible usando Markdown. Usa títulos para secciones (ej. "## Día 1: Piernas y Core"), listas para ejercicios, y negrita para resaltar.

Cuando el usuario pida información específica sobre ejercicios o comidas, responde únicamente con un JSON con la siguiente estructura:

\`\`\`json
{
  "cards": [
    {
      "titulo": "Nombre específico del ejercicio o comida de esta lista estricta",
      "imagenUrl": "<nombreenminusculassinespaciosyntildes>",
      "descripcion": "Breve descripción concreta y clara del ejercicio o comida."
    }
  ]
}
\`\`\`

Los nombres permitidos para ejercicios son: Sentadillas, Flexiones, Plancha, Burpees, Zancadas, Abdominales, Saltos de tijera, Peso muerto, Press de banca, Remo con mancuernas, Elevaciones laterales, Curl de bíceps, Tríceps en polea, Dominadas, Escaladores, Elevación de talones, Jumping jacks, Russian twists, Superman, Crunch abdominal, Press militar, Bicicleta abdominal, Patada de glúteo, Puente de glúteos, Remo en barra, Sentadilla búlgara, Fondos de tríceps, Curl de martillo, Mountain climbers, Peso muerto rumano, Plancha lateral, Aperturas con mancuernas, Skaters, High knees, Step-ups, Sumo deadlift, Bird-dog.

Los nombres permitidos para alimentos son: Pechuga de pollo, Arroz integral, Brócoli, Salmón, Batata, Aguacate, Yogur natural, Huevos, Almendras, Manzana, Espinaca, Quinoa, Atún, Lentejas, Zanahoria, Pavo, Nueces, Avena, Plátano, Tomate, Pepino, Pimiento rojo, Leche descremada, Requesón, Pan integral, Garbanzos, Arándanos, Fresas, Mango, Uvas, Papaya, Chía, Semillas de girasol, Aceite de oliva, Kale, Tofu, Edamame, Calabacín, Naranja.

Para generar el campo \`imagenUrl\`, haz lo siguiente:

- Transforma el título a minúsculas,
- Quita espacios,
- Quita tildes y caracteres especiales,

Ejemplo:  
Para \`titulo: "Peso muerto"\` → \`imagenUrl: "pesomuerto"\`  
Para \`titulo: "Pechuga de pollo"\` → \`imagenUrl: "pechugadepollo"\`

Solo usa esos nombres exactos y no inventes otros.

No incluyas texto adicional fuera del JSON.

Si el usuario pide varios ejercicios o comidas, genera una card por cada uno en la lista dentro del JSON.

Si el usuario pregunta algo fuera de estos temas, responde amablemente que no puedes ayudar con eso.
`.trim()


}
,


          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const respuesta = response.data.choices[0].message.content;
    res.json({ respuesta });
  } catch (error) {
    console.error("Error con DeepSeek:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al contactar a DeepSeek" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
