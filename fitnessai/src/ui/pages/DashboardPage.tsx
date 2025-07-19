import {
  Box,
  Heading,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Progress,
  useColorModeValue,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FaRunning } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const cardBg = useColorModeValue("white", "gray.800");

  const data = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Peso (kg)",
        data: [72.5, 71.0, 70.8, 70.5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Navbar />
      <Flex direction="column" flex="1" p={8} align="center">
        <Heading mb={6} color="brand.700" size="lg">
          Tu Panel de Progreso
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} maxW="900px" w="full">
          {/* Objetivo */}
          <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={2}>Objetivo actual</Heading>
            <Text fontSize="xl" fontWeight="bold" color="red.500">Perder grasa</Text>
            <Text mt={2}>Meta: 65 kg &nbsp;|&nbsp; Peso actual: 70.5 kg</Text>
            <Progress colorScheme="red" value={75} mt={4} />
            <Text mt={2} fontSize="sm" color="gray.500">Has perdido 3.5 kg desde que empezaste</Text>
          </Box>

          {/* Calorías recomendadas */}
          <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={2}>Calorías diarias</Heading>
            <Stat>
              <StatLabel>Meta sugerida</StatLabel>
              <StatNumber>1,800 kcal</StatNumber>
              <StatHelpText>Proteína: 130g | Carb: 160g | Grasa: 60g</StatHelpText>
            </Stat>
          </Box>

          {/* Entrenamiento del día */}
          <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={2}>Entrenamiento de hoy</Heading>
            <Text fontWeight="semibold" fontSize="lg">Entrenamiento HIIT</Text>
            <Text mt={2}>Duración: 35 minutos</Text>
            <Text fontSize="sm" color="gray.500">Incluye: jumping jacks, burpees, mountain climbers</Text>
          </Box>

          {/* Peso histórico */}
          <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={2}>Historial de peso</Heading>
            <Text>Últimos días:</Text>
            <Text mt={2} fontSize="sm">Lun: 71.0 kg</Text>
            <Text fontSize="sm">Mar: 70.8 kg</Text>
            <Text fontSize="sm">Mié: 70.5 kg</Text>
            <Text fontSize="sm">Hoy: 70.5 kg</Text>
          </Box>
        </SimpleGrid>

        <Divider my={8} />

        {/* Tip diario */}
        <Box p={6} bg={cardBg} borderRadius="lg" boxShadow="md" maxW="600px" w="full" textAlign="center">
          <Text fontSize="md" color="gray.600" fontStyle="italic">
            🧠 Tip del día: "No se trata de hacer más, sino de hacerlo constante. Mantente firme en tu rutina."
          </Text>
        </Box>

        {/* Ícono decorativo */}
        <Box mt={10}>
          <Icon as={FaRunning} boxSize={12} color="red.400" />
        </Box>

        {/* Gráfico simulado */}
        <Box mt={10} p={6} bg={cardBg} borderRadius="lg" boxShadow="md" maxW="700px" w="full">
          <Heading size="md" mb={4}>Progreso de Peso</Heading>
          <Line data={data} options={options} />
        </Box>

        {/* Sugerencias IA */}
        <Box mt={10} p={6} bg={cardBg} borderRadius="lg" boxShadow="md" maxW="700px" w="full">
          <Heading size="md" mb={2}>Sugerencias Semanales (IA)</Heading>
          <Text fontSize="sm" color="gray.600" mb={1}>✔️ Intenta dormir al menos 7h por noche para mejorar la quema de grasa.</Text>
          <Text fontSize="sm" color="gray.600" mb={1}>✔️ Cambia una comida alta en carbohidratos por una fuente magra de proteína.</Text>
          <Text fontSize="sm" color="gray.600" mb={1}>✔️ Agrega 10 minutos de caminata al finalizar tus entrenamientos.</Text>
        </Box>
      </Flex>
       <ChatBot />
    </Flex>
  );
}
