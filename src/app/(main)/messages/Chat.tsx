"use client";

import * as React from "react";

import { useTheme } from "next-themes";

import { Chat as StreamChat } from "stream-chat-react";

import useInitializeChatClient from "./useInitializeChatClient";

import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";

import { Loader2 } from "lucide-react";

const Chat = () => {
  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }

  return (
    <main className="relative h-auto w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
};

export default Chat;
