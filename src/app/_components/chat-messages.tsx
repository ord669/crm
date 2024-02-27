"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementRef } from "react";

import { ChatMessage, ChatMessageProps } from "@/app/_components/chat-message";
import { Message } from "@prisma/client";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

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

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

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
          content={message.text!}
          role={message.traffic}
        />
      ))}
      {isLoading && <ChatMessage role="system" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
