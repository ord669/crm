"use client";
import { api } from "@/trpc/react";
import React from "react";
import { Separator } from "./ui/separator";

export default function MsgList() {
  const contactId = 154298343; // Example contact ID, replace with dynamic data as needed.
  const { data, isLoading, error } = api.msg.getMsgsById.useQuery({
    id: contactId,
  });

  // Loading state
  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  // Error state
  if (error) {
    return <div>Error loading messages: {error.message}</div>;
  }

  console.log("data: ", data);
  if (!data) return;
  return (
    <div className="w-full ">
      {data.map((msg) => (
        <div key={msg.id} className="  w-full ">
          <div className="mt-2 flex items-center   gap-6  align-middle">
            <h3 className="text-lg">
              {msg.traffic === "outgoing" ? "me" : "him"}:
            </h3>
            <p className="text-sm">{msg.text}</p>
          </div>
          <Separator className="bg-primary" />
        </div>
      ))}
    </div>
  );
}
