import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Progress,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaRegSmile, FaChartBar, FaClipboardList } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import { useNavigate } from "react-router-dom";
import RegistroDiarioModal from "../components/RegistroDiarioModal";
import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegistro = () => {
    navigate("/dashboard/registro-diario");
  };

  const datosSemanal = [
    { dia: "Lun", minutos: 30 },
    { dia: "Mar", minutos: 45 },
    { dia: "Mié", minutos: 20 },
    { dia: "Jue", minutos: 40 },
    { dia: "Vie", minutos: 50 },
    { dia: "Sáb", minutos: 0 },
    { dia: "Dom", minutos: 0 },
  ];

  // Rutina simulada de lunes a viernes con más detalle para cards
  const rutinaSimulada = [
    {
      dia: "Lunes",
      actividad: "Cardio + Fuerza (piernas)",
      ejercicios: [
        { id: "1", nombre: "Sentadillas", imagen: "https://i.imgur.com/9o2hE2F.png" },
        { id: "2", nombre: "Zancadas", imagen: "https://i.imgur.com/J4n2zoW.png" },
        { id: "3", nombre: "Prensa de pierna", imagen: "https://i.imgur.com/7pKxQ0F.png" },
      ],
    },
    {
      dia: "Martes",
      actividad: "HIIT + Core",
      ejercicios: [
        { id: "4", nombre: "Plancha", imagen: "https://i.imgur.com/UXqBvfh.png" },
        { id: "5", nombre: "Mountain Climbers", imagen: "https://i.imgur.com/0Ip4qPa.png" },
      ],
    },
    {
      dia: "Miércoles",
      actividad: "Descanso activo (caminar)",
      ejercicios: [],
    },
    {
      dia: "Jueves",
      actividad: "Fuerza (brazos y espalda)",
      ejercicios: [
        { id: "6", nombre: "Curl de bíceps", imagen: "https://i.imgur.com/IS4bRvV.png" },
        { id: "7", nombre: "Remo con mancuerna", imagen: "https://i.imgur.com/rQMtgiR.png" },
      ],
    },
    {
      dia: "Viernes",
      actividad: "Yoga y estiramientos",
      ejercicios: [
        { id: "8", nombre: "Saludo al sol", imagen: "https://i.imgur.com/dN3uJHd.png" },
        { id: "9", nombre: "Estiramiento de piernas", imagen: "https://i.imgur.com/wEtjXiz.png" },
      ],
    },
  ];

  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Flex direction="column" minH="100vh" bg="gray.50" fontFamily="'Open Sans', sans-serif">
      <Navbar />

      <Flex direction="column" flex="1" p={8} maxW="960px" mx="auto" w="100%" align="center">
        <Button
          size="lg"
          colorScheme="teal"
          leftIcon={<FaClipboardList />}
          mb={8}
          onClick={() => setIsModalOpen(true)} // sólo un onClick aquí
        >
          Registrar día
        </Button>

        <RegistroDiarioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          w="100%"
          justify="center"
        >
          {/* Último resumen con progress bars */}
          <Box
            bg={cardBg}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            flex="1"
            border="1px solid"
            borderColor="gray.200"
            minW="400px"
            height="320px"
          >
            <Flex justify="center" mb={3}>
              <Icon as={FaRegSmile} boxSize={6} color="blue.500" />
            </Flex>

            <Text fontSize="xl" fontWeight="semibold" color="gray.700" mb={4} textAlign="center">
              Último resumen
            </Text>

            <Box mb={4}>
              <Text fontWeight="medium" mb={1}>Rutina completada: 80%</Text>
              <Progress value={80} size="sm" colorScheme="blue" borderRadius="md" />
            </Box>

            <Box mb={4}>
              <Text fontWeight="medium" mb={1}>Intensidad promedio: Normal</Text>
              <Progress value={60} size="sm" colorScheme="yellow" borderRadius="md" />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={1}>Extras realizados</Text>
              <Text fontSize="sm" color="gray.500">Caminé, Respiración</Text>
            </Box>
          </Box>

          {/* Progreso semanal con línea curva */}
          <Box
            bg={cardBg}
            p={8}
            borderRadius="lg"
            boxShadow="md"
            flex="1"
            border="1px solid"
            borderColor="gray.200"
            minW="400px"
            height="320px"
          >
            <Flex justify="center" mb={3}>
              <Icon as={FaChartBar} boxSize={6} color="green.500" />
            </Flex>

            <Text fontSize="xl" fontWeight="semibold" color="gray.700" mb={4} textAlign="center">
              Progreso semanal
            </Text>

            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={datosSemanal} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutos"
                  stroke="#38A169"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2, fill: "#38A169" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Stack>

        {/* Cards para rutina simulada */}
        <Box
          bg={cardBg}
          mt={8}
          p={6}
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          maxW="960px"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading size="md" mb={6} color="brand.600" textAlign="center">
            Rutina Simulada (Lunes a Viernes)
          </Heading>

          <Stack spacing={6}>
            {rutinaSimulada.map(({ dia, actividad, ejercicios }) => (
              <Box
                key={dia}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                boxShadow="sm"
                bg={useColorModeValue("gray.50", "gray.600")}
              >
                <Heading size="sm" mb={3}>
                  {dia}: {actividad}
                </Heading>

                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
                  {ejercicios.length ? (
                    ejercicios.map(({ id, nombre, imagen }) => (
                      <Box
                        key={id}
                        borderWidth="1px"
                        borderRadius="md"
                        overflow="hidden"
                        cursor="pointer"
                        _hover={{ boxShadow: "md" }}
                      >
                        <Box
                          h="120px"
                          bgImage={`url(${imagen})`}
                          bgSize="cover"
                          bgPosition="center"
                        />
                        <Text
                          p={2}
                          fontWeight="semibold"
                          textAlign="center"
                          noOfLines={1}
                          title={nombre}
                        >
                          {nombre}
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text fontStyle="italic" color="gray.500">
                      Sin ejercicios para este día
                    </Text>
                  )}
                </SimpleGrid>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>

      <ChatBot />
    </Flex>
  );
}
