"use client";

// Since ChatMessageProps is not used, ensure it's either utilized or remove this import.
// Use `import type` for ElementRef as it's only used for type information.
import { useEffect, useRef, useState } from "react";
import type { ElementRef } from "react";

// Assuming you're using ChatMessage, only remove the unused ChatMessageProps import.
// If ChatMessageProps is used elsewhere in the file not shown, then keep it.
import { ChatMessage } from "@/app/_components/chat-message";
import type { Message } from "@prisma/client"; // Use `import type` here since Message is likely only used as a type.

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
    // Use ! to assert that scrollRef.current is not null.
    scrollRef.current!.scrollIntoView({ behavior: "smooth" });
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
          content={message.text as string}
          role={message.traffic}
        />
      ))}
      {isLoading && <ChatMessage role="system" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
