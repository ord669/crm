import { PrismaClient } from "@prisma/client";
import type { Contact } from "@prisma/client";
import type { ContactCreateArgs } from "@/globals";

const prisma = new PrismaClient();

export const contactModel = {
  create,
};

async function create(contactPayload: ContactCreateArgs): Promise<Contact> {
  return await prisma.contact.create({
    data: {
      firstName: contactPayload.firstName,
      lastName: contactPayload.lastName,
      phone: contactPayload.phone,
      email: contactPayload.email,
      language: contactPayload.language,
      profilePic: contactPayload.profilePic,
      countryCode: contactPayload.countryCode,
      status: contactPayload.status,
    },
  });
}
