// src/server/models/postModel.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postModel = {
  getAll,
  getById,
  deleteById,
  create,
};

async function create(postTxt: string) {
  console.log("postTxtsssss: ", postTxt);
  // Simulate a slow db call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await prisma.post.create({
    data: {
      postTxt,
    },
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
