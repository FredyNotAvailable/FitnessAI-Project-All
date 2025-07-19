import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../app/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [objetivo, setObjetivo] = useState<"ganar_musculo" | "bajar_peso">("ganar_musculo");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  // const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nombre || !edad || !peso || !altura || !objetivo || !email || !password) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, ingresa un correo electrónico válido.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        id: user.uid,
        nombre,
        correo: email,
        edad: Number(edad),
        peso: Number(peso),
        altura: Number(altura),
        objetivo,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "¡Registro exitoso!",
        description: "Bienvenido/a a FitnessAI. Prepárate para transformar tu entrenamiento.",
        status: "success",
        duration: 3500,
        isClosable: true,
         position: "top", // <--- Aquí
        // onCloseComplete: () => {
        //   navigate("/login");
        // },
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Algo salió mal, intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" width="100vw">
      {/* Izquierda: imagen 50% */}
      <Box flex="1" position="relative" display={{ base: "none", md: "block" }}>
        <img
          src="/images/fitness-image.jpg"
          alt="Fitness"
          style={{ objectFit: "cover", width: "100%", height: "100vh" }}
        />
      </Box>

      {/* Derecha: formulario 50% */}
      <Flex
        flex="1"
        direction="column"
        justify="center"
        align="center"
        bg="white"
        p={12}
        overflowY="auto"
      >
        <Container maxW="md">
          <Heading mb={6} textAlign="center" color="gray.700" fontWeight="extrabold" fontSize="3xl">
            Crear cuenta
          </Heading>

          <Stack spacing={4}>
            <Input
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            />

            <Input
              placeholder="Edad"
              type="number"
              min={18}
              max={100}
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            />

            <Input
              placeholder="Peso (kg)"
              type="number"
              min={40}
              max={180}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            />

            <Input
              placeholder="Altura (cm)"
              type="number"
              min={140}
              max={220}
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            />

            <Select
              placeholder="Selecciona tu objetivo"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value as "ganar_musculo" | "bajar_peso")}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            >
              <option value="ganar_musculo">Ganar músculo</option>
              <option value="bajar_peso">Bajar de peso</option>
            </Select>

            <Input
              placeholder="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="gray.500"
              borderColor="gray.300"
            />

            <InputGroup>
              <Input
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="gray.500"
                borderColor="gray.300"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              colorScheme="gray"
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.800" }}
              onClick={handleRegister}
              size="md"
              fontWeight="bold"
              mt={4}
              width="100%"
              isLoading={isLoading}
              loadingText="Registrando..."
            >
              Registrarse
            </Button>

            <Text textAlign="center" color="gray.600" fontWeight="medium" mt={4}>
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" color="gray.700" fontWeight="bold" _hover={{ color: "gray.900" }}>
                Iniciar sesión
              </Link>
            </Text>
          </Stack>
        </Container>
      </Flex>
    </Flex>
  );
}
