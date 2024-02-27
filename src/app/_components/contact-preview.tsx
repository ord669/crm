"use client";
import { api } from "@/trpc/react";
import React from "react";
import MsgList from "./msg-list";
import { Separator } from "./ui/separator";

interface ContactPreviewProps {
  contactId: number;
}
export default function ContactPreview({ contactId }: ContactPreviewProps) {
  const { data, isLoading, error } = api.contact.getById.useQuery({
    id: Number(contactId),
  });

  // Loading state
  if (isLoading) {
    return <div>Loading contact...</div>;
  }

  // Error state
  if (error) {
    return <div>Error loading contact: {error.message}</div>;
  }

  console.log("data: ", data);
  if (!data)
    return (
      <div>
        <h3>hellsssso</h3>
      </div>
    );
  return (
    <div className="mx-auto h-full w-full max-w-4xl">
      <MsgList contactId={Number(contactId)} />
    </div>
  );
}
