import { Message, PrismaClient } from "@prisma/client";

import type { MessageCreateArgs } from "@/globals";

const prisma = new PrismaClient();

export const msgModel = {
  create,
  deleteAllMsgs,
  getMessagesByContactId,
  getAll,
};

async function create(msgPayload: MessageCreateArgs) {
  const {
    messageId,
    channelMessageId,
    contactId,
    channelId,
    traffic,
    timestamp,
    message,
  } = msgPayload;

  return await prisma.message.create({
    data: {
      messageId: messageId.toString(), // Ensuring messageId is a string
      channelMessageId: channelMessageId?.toString(), // Ensuring channelMessageId is a string if it exists
      contactId,
      channelId,
      traffic,
      timestamp, // Directly using the provided timestamp without conversion
      type: message.type,
      text: message.text,
      // If you need to store `messageTag` and `status`, consider adjusting your Prisma model or the handling here
    },
  });
}

async function deleteAllMsgs() {
  // Delete all records from the Message model
  await prisma.message.deleteMany({});
  console.log("All messages have been deleted.");
}

async function getMessagesByContactId(
  contactId: number,
): Promise<Message[] | undefined> {
  try {
    const messages = await prisma.message.findMany({
      where: {
        contactId: contactId,
      },
      orderBy: {
        createdAt: "asc", // or 'desc' if you want the newest messages first
      },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages for contact:", error);
  }
}

async function getAll() {
  return await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
}
