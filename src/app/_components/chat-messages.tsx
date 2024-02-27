"use client";

import { useEffect, useState } from "react";

import { ChatMessage } from "@/app/_components/chat-message";
import type { Message } from "@prisma/client";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-scroll pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        role="incoming"
        content={`Hello, I am ${"Or"}, ${"d"}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.text as string}
          role={message.traffic}
        />
      ))}
      {isLoading && <ChatMessage role="system" isLoading />}
    </div>
  );
};
