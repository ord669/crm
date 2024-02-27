// src/server/services/postService.ts

import { contactModel } from "../models/contact.model";
import type { ContactCreateArgs } from "@/globals";

export const contactService = {
  create,
  checkContactExists,
  getAll,
  getById,
};

async function create(contact: ContactCreateArgs) {
  console.log("contact from service: ");
  try {
    return await contactModel.create(contact);
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}
async function checkContactExists(id: number) {
  console.log("contact from service: ");
  try {
    return await contactModel.checkContactExists(id);
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}

async function getAll() {
  return await contactModel.getAll();
}

async function getById(id: number) {
  return await contactModel.getById(id);
}
