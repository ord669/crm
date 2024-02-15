// src/server/services/postService.ts

import { postModel } from "../models/post.model";

export const postService = {
  getAll,
  getById,
  deleteById,
  create,
};

async function create(postTxt: string) {
  console.log("postTxtsssss: ", postTxt);
  return await postModel.create(postTxt);
}

async function getAll() {
  return await postModel.getAll();
}

async function getById(id: number) {
  return await postModel.getById(id);
}

async function deleteById(id: number) {
  return await postModel.deleteById(id);
}
