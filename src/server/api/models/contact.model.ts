import { PrismaClient } from "@prisma/client";
import type { Contact } from "@prisma/client";
import type { ContactCreateArgs } from "@/globals";

const prisma = new PrismaClient();

export const contactModel = {
  create,
  checkContactExists,
  getAll,
  getById,
};

async function create(contactPayload: ContactCreateArgs): Promise<Contact> {
  console.log("contactPayload: ", contactPayload.id);
  return await prisma.contact.create({
    data: {
      id: contactPayload.id,
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

async function checkContactExists(id: number) {
  return await prisma.contact.findUnique({
    where: {
      id,
    },
  });
}

async function getAll(): Promise<Contact[]> {
  return await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getById(id: number): Promise<Contact | null> {
  return await prisma.contact.findUnique({
    where: { id },
  });
}
