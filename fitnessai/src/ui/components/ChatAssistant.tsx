import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  Box,
  Input,
  Button,
  Spinner,
  HStack,
  useToken,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatMessage } from "./ChatMessage";
import MapaLugaresEntrenamientoCard from "./MapaLugaresEntrenamientoCard";
import { SimpleCard } from "./SimpleCard";
import { listaComidas, listaEjercicios } from "./constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  respuesta: string;
}

export const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Obtener colores reales de la paleta
  const brand700 = useToken("colors", "brand.700"); // "#333333"
  const brand800 = useToken("colors", "brand.800"); // "#232323ff"

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post<ChatResponse>("http://localhost:3000/api/ai", {
        prompt: input,
      });

      const botMessage: Message = {
        role: "assistant",
        content: res.data.respuesta,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Hubo un error al contactar con el asistente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

return (
  <Box w="100%" h="100vh" bg="brand.800" display="flex" flexDirection="column">
    {/* Scroll vertical sobre toda la pantalla */}
    <Box
      flex={1}
      overflowY="auto"
      px={4}
      py={6}
      sx={{
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { backgroundColor: brand800 },
        "&::-webkit-scrollbar-thumb": { backgroundColor: brand700, borderRadius: "24px" },
        scrollbarWidth: "thin",
        scrollbarColor: `${brand700} ${brand800}`,
      }}
    >
      {/* Contenido centrado horizontalmente */}
      <Box maxW="750px" mx="auto" display="flex" flexDirection="column" gap={3}>
        {messages.map((msg, i) => {
          if (msg.role === "assistant") {
            console.log("Respuesta AI:", msg.content);

            try {
              const jsonStart = msg.content.indexOf("{");
              const jsonEnd = msg.content.lastIndexOf("}");

              if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonStr = msg.content.substring(jsonStart, jsonEnd + 1);
                const parsed = JSON.parse(jsonStr);

                // Extraer texto antes y después del JSON
                const textBefore = msg.content.substring(0, jsonStart).trim();
                const textAfter = msg.content.substring(jsonEnd + 1).trim();

                return (
                  <React.Fragment key={i}>
                    {/* Mostrar texto antes del JSON si existe */}
                    {textBefore.length > 0 && (
                      <ChatMessage content={textBefore} role="assistant" />
                    )}

                    {/* Mostrar cards horizontalmente si existen */}
                      {Array.isArray(parsed.cards) ? (
                        <Box
                          display="flex"
                          flexDirection="row"
                          overflowX="auto"
                          gap={3}
                          py={2}
                          sx={{
                            "&::-webkit-scrollbar": { height: "6px" },
                            "&::-webkit-scrollbar-thumb": { backgroundColor: brand700, borderRadius: "12px" },
                          }}
                        >
                          {parsed.cards.map((card: any, idx: number) => {
                            // Busca en las listas si el título es comida o ejercicio
                            const isComida = listaComidas.includes(card.titulo);
                            const carpeta = isComida ? "comidas" : "ejercicios";

                            // Usa directamente card.imagenUrl (que viene sin extensión) para armar la URL
                            const finalUrl = `/images/${carpeta}/${card.imagenUrl}.jpg`;

                            return (
                              <SimpleCard
                                key={idx}
                                titulo={card.titulo}
                                imagenUrl={finalUrl}
                                descripcion={card.descripcion}
                              />
                            );
                          })}
                        </Box>
                      ) : parsed.card ? (
                        (() => {
                          const isComida = listaComidas.includes(parsed.card.titulo);
                          const carpeta = isComida ? "comidas" : "ejercicios";
                          const finalUrl = `/images/${carpeta}/${parsed.card.imagenUrl}.jpg`;
                          return (
                            <SimpleCard
                              titulo={parsed.card.titulo}
                              imagenUrl={finalUrl}
                              descripcion={parsed.card.descripcion}
                            />
                          );
                        })()
                      ) : null}


                    {/* Mostrar texto después del JSON si existe */}
                    {textAfter.length > 0 && (
                      <ChatMessage content={textAfter} role="assistant" />
                    )}
                  </React.Fragment>
                );
              }
            } catch {
              // No es JSON válido, muestra texto normal
            }
          }

          // Si no es asistente o no hay JSON, mostrar normal
          return (
            <React.Fragment key={i}>
              <ChatMessage content={msg.content} role={msg.role} />
              {msg.role === "assistant" &&
                /(lugar|lugares|sitio|sitios|gimnasio|entrenar|ejercicio)/i.test(msg.content) && (
                  <MapaLugaresEntrenamientoCard />
              )}
            </React.Fragment>
          );
        })}

        {loading && (
          <Box alignSelf="flex-start">
            <Spinner size="sm" color="white" />
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>
    </Box>

    {/* Input pegado abajo */}
    <Box px={4} py={3} bg="brand.800" borderTop="1px solid" borderColor="whiteAlpha.300">
      <Box maxW="750px" mx="auto">
        <HStack>
          <Input
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            bg="brand.500"
            color="white"
            _placeholder={{ color: "whiteAlpha.700" }}
            borderColor="whiteAlpha.500"
            isDisabled={loading}
          />
          <Button
            bg="brand.500"
            color="white"
            _hover={{ bg: "brand.600" }}
            _active={{ bg: "brand.700" }}
            onClick={sendMessage}
            isDisabled={!input.trim() || loading}
            isLoading={loading}
          >
            Enviar
          </Button>
        </HStack>
      </Box>
    </Box>
  </Box>
);


};
