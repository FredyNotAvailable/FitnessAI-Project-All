// components/ChatBot.tsx
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! Soy tu asistente FitnessAI. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");

  const bgUserMsg = useColorModeValue("blue.100", "blue.700");
  const bgBotMsg = useColorModeValue("gray.100", "gray.700");

  const photoURL = "/images/fitness-image.jpg"; // Foto estática, sin cambio

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Gracias por tu mensaje. Pronto tendré una sugerencia para ti." },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          bottom="90px"
          right="20px"
          w="400px"
          h="450px"
          bg="white"
          boxShadow="2xl"
          borderRadius="lg"
          p={4}
          zIndex={20}
          display="flex"
          flexDirection="column"
        >
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">FitnessBot</Text>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              aria-label="Cerrar chat"
              onClick={() => setIsOpen(false)}
            />
          </HStack>

          {/* Avatar estático sin interacción */}
          <HStack mb={4} spacing={4}>
            <Avatar src={photoURL} size="lg" boxShadow="md" />
          </HStack>

          <VStack
            spacing={3}
            align="stretch"
            flex="1"
            overflowY="auto"
            mb={2}
            px={1}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
                bg={msg.sender === "user" ? bgUserMsg : bgBotMsg}
                px={4}
                py={2}
                borderRadius="md"
                maxW="80%"
                wordBreak="break-word"
              >
                <Text fontSize="sm">{msg.text}</Text>
              </Box>
            ))}
          </VStack>

          <HStack spacing={2}>
            <Input
              placeholder="Escribe algo..."
              size="md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button size="md" onClick={handleSend} colorScheme="blue">
              Enviar
            </Button>
          </HStack>
        </Box>
      )}

      <Box position="fixed" bottom="20px" right="20px" zIndex={10}>
        <Avatar
          src={photoURL}
          size="lg"
          cursor="pointer"
          onClick={() => setIsOpen(true)}
          boxShadow="md"
        />
      </Box>
    </>
  );
}
