import { PrismaClient } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { ContactCreateArgs } from "@/globals";

const prisma = new PrismaClient();

export const contactModel = {
  create,
};

async function create(contactPayload: ContactCreateArgs) {
  // Ensure all fields in ContactCreateArgs are compatible with Prisma.ContactCreateInput
  const data: Prisma.ContactCreateInput = {
    // Assuming `id` is correctly part of ContactCreateArgs and expected by Prisma.ContactCreateInput
    // Remove `id` if it's auto-generated and not part of Prisma.ContactCreateInput
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const contact = await prisma.contact.create({ data });
    return contact;
  } catch (err) {
    console.error("Error from contact model create to prisma: ", err);
    throw err;
  }
}
