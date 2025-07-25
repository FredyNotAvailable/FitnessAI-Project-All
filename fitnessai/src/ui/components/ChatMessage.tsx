import ReactMarkdown from "react-markdown";
import { Box } from "@chakra-ui/react";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
}

export const ChatMessage = ({ content, role }: ChatMessageProps) => {
  // Define estilos según el rol (usuario o asistente)
  const bgColor = role === "user" ? "brand.600" : "brand.700";
  const alignSelf = role === "user" ? "flex-end" : "flex-start";

  return (
    <Box
      bg={bgColor}
      color="white"
      px={4}
      py={2}
      borderRadius="xl"
      maxW="70%"
      alignSelf={alignSelf}
      whiteSpace="pre-wrap"
      sx={{
        // Opcional: estilos para links, listas, etc
        "& a": { color: "cyan.300", textDecoration: "underline" },
        "& ul": { paddingLeft: "1.2rem", margin: 0 },
        "& li": { marginBottom: "-1rem" },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};
