import { PrismaClient } from "@prisma/client";
import type { Message } from "@prisma/client";
import type { MessageCreateArgs } from "@/globals";

const prisma = new PrismaClient();

export const msgModel = {
  create,
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
