// src/server/models/postModel.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userModel = {
  getLatest,
  getAll,
  getById,
  deleteById,
  create,
};

async function create(
  id: string,
  firstName: string,
  lastName: string,
  email: string | null,
) {
  return await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      email, // This is optional in your model, so it's fine to pass null
    },
  });
}

async function getLatest() {
  return await prisma.post.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

async function getAll() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getById(id: number) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

async function deleteById(id: number) {
  return await prisma.post.delete({
    where: { id },
  });
}
