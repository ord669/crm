// src/server/services/postService.ts

import { contactModel } from "../models/contact.model";
import { ContactCreateArgs } from "@/globals";

export const contactService = {
  create,
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
