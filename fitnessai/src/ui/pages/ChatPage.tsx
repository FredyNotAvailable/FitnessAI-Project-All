import { ChatSidebar } from "../components/ChatSidebar";
import { ChatAssistant } from "../components/ChatAssistant";
import { VideoPlayer } from "../components/VideoPlayer";
import { Box } from "@chakra-ui/react";

export const ChatPage = () => {
  return (
    <Box display="flex" height="100vh" bg="brand.800">
      <ChatSidebar />
      <ChatAssistant />
      <VideoPlayer />
    </Box>
  );
};
