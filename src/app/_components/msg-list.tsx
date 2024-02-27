"use client";
import { api } from "@/trpc/react";
import React from "react";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { Separator } from "./ui/separator";

interface contactProps {
  contactId: number;
}

export default function MsgList({ contactId }: contactProps) {
  // Fetching messages
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = api.msg.getMsgsById.useQuery({ id: contactId });

  // Fetching contact information, renaming data, isLoading, and error to avoid conflict
  const {
    data: contactData,
    isLoading: contactLoading,
    error: contactError,
  } = api.contact.getById.useQuery({ id: contactId });

  // Loading state
  if (messagesLoading) {
    return <div>Loading messages...</div>;
  }

  // Error state
  if (messagesError) {
    return <div>Error loading messages: {messagesError.message}</div>;
  }

  if (!messagesData || !contactData)
    return (
      <>
        <h3>hello</h3>
      </>
    );
  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader contact={contactData} messages={messagesData} />

      <ChatMessages isLoading={messagesLoading} messages={messagesData} />
    </div>
  );
}
