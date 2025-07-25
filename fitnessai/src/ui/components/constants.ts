// constants.ts

export const listaComidas = [
  "Pechuga de pollo",
  "Arroz integral",
  "Brócoli",
  "Salmón",
  "Batata",
  "Aguacate",
  "Yogur natural",
  "Huevos",
  "Almendras",
  "Manzana",
  "Espinaca",
  "Quinoa",
  "Atún",
  "Lentejas",
  "Zanahoria",
  "Pavo",
  "Nueces",
  "Avena",
  "Plátano",
  "Tomate",
  "Pepino",
  "Pimiento rojo",
  "Leche descremada",
  "Requesón",
  "Pan integral",
  "Garbanzos",
  "Arándanos",
  "Fresas",
  "Mango",
  "Uvas",
  "Papaya",
  "Chía",
  "Semillas de girasol",
  "Aceite de oliva",
  "Kale",
  "Tofu",
  "Edamame",
  "Calabacín",
  "Naranja",
];

export const listaEjercicios = [
  "Sentadillas",
  "Flexiones",
  "Plancha",
  "Burpees",
  "Zancadas",
  "Abdominales",
  "Saltos de tijera",
  "Peso muerto",
  "Press de banca",
  "Remo con mancuernas",
  "Elevaciones laterales",
  "Curl de bíceps",
  "Tríceps en polea",
  "Dominadas",
  "Escaladores",
  "Elevación de talones",
  "Jumping jacks",
  "Russian twists",
  "Superman",
  "Crunch abdominal",
  "Press militar",
  "Bicicleta abdominal",
  "Patada de glúteo",
  "Puente de glúteos",
  "Remo en barra",
  "Sentadilla búlgara",
  "Fondos de tríceps",
  "Curl de martillo",
  "Mountain climbers",
  "Peso muerto rumano",
  "Plancha lateral",
  "Aperturas con mancuernas",
  "Skaters",
  "High knees",
  "Step-ups",
  "Sumo deadlift",
  "Bird-dog",
];

// Ahora la lista con objetos para URLs:

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/\s+/g, "") // quita espacios
    .replace(/[^a-z0-9]/g, ""); // quita caracteres especiales

export const listaComidasConUrl = listaComidas.map((titulo) => ({
  titulo,
  imagenUrl: `/images/comidas/${normalize(titulo)}.jpg`,
}));

export const listaEjerciciosConUrl = listaEjercicios.map((titulo) => ({
  titulo,
  imagenUrl: `/images/ejercicios/${normalize(titulo)}.jpg`,
}));
