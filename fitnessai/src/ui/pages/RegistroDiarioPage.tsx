import {
  Box,
  Heading,
  VStack,
  Text,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Checkbox,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

export default function RegistroDiarioPage() {
  const toast = useToast();

  const [rutina, setRutina] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [intensidad, setIntensidad] = useState("");
  const [extras, setExtras] = useState<string[]>([]);

  const handleGuardar = () => {
    if (!rutina || !tiempo || !intensidad) {
      toast({
        title: "Completa todas las preguntas de entrenamiento.",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    console.log({ rutina, tiempo, intensidad, extras });

    toast({
      title: "Registro guardado",
      description: "Tu progreso del día ha sido registrado.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box maxW="700px" mx="auto" px={6} py={8}>
        <Heading mb={6} textAlign="center" color="brand.500">
          Registro Diario
        </Heading>

        <VStack spacing={6} align="start" bg="white" p={6} rounded="md" shadow="md">
          <Box>
            <Text fontWeight="bold" mb={2}>🏋️ ¿Hiciste la rutina de hoy?</Text>
            <RadioGroup onChange={setRutina} value={rutina}>
              <Stack spacing={3}>
                <Radio value="completa">✅ Completa</Radio>
                <Radio value="incompleta">⚠️ Incompleta</Radio>
                <Radio value="no">❌ No la hice</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>⏱️ ¿Cuánto tiempo entrenaste?</Text>
            <RadioGroup onChange={setTiempo} value={tiempo}>
              <Stack spacing={3} direction="row">
                <Radio value="10">10 min</Radio>
                <Radio value="20">20 min</Radio>
                <Radio value="30">30 min</Radio>
                <Radio value="40">40+ min</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>🔴 ¿Cómo estuvo el entreno?</Text>
            <RadioGroup onChange={setIntensidad} value={intensidad}>
              <Stack spacing={3} direction="row">
                <Radio value="suave">🟢 Suave</Radio>
                <Radio value="normal">🟡 Normal</Radio>
                <Radio value="intenso">🔴 Intenso</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>💪 ¿Extras?</Text>
            <CheckboxGroup value={extras} onChange={(val) => setExtras(val as string[])}>
              <Stack spacing={2}>
                <Checkbox value="camine">🚶 Caminé bastante</Checkbox>
                <Checkbox value="relajacion">🧘 Respiración o relajación</Checkbox>
                <Checkbox value="estire">🤸 Estiré</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>

          <Button colorScheme="blue" onClick={handleGuardar}>
            Guardar Registro
          </Button>
        </VStack>
      </Box>

      <ChatBot />
    </Box>
  );
}
