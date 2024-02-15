// src/server/models/postModel.ts

import { ContactCreateArgs } from "@/globals";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const contactModel = {
  create,
};

async function create(contactPayload: ContactCreateArgs) {
  // Ensuring that assigneeId is handled correctly when undefined or null
  const data = {
    id: contactPayload.id,
    firstName: contactPayload.firstName,
    lastName: contactPayload.lastName,
    phone: contactPayload.phone,
    email: contactPayload.email,
    language: contactPayload.language,
    profilePic: contactPayload.profilePic,
    countryCode: contactPayload.countryCode,
    status: contactPayload.status,
  };

  try {
    const contact = await prisma.contact.create({ data });
    return contact;
  } catch (err) {
    console.log("err from contact model create to prisma ", err);
    throw err;
  }
}
