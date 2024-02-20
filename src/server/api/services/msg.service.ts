// src/server/services/postService.ts

import { msgModel } from "../models/msg.model";
import type { MessageCreateArgs } from "@/globals";

export const msgService = {
  create,
};

async function create(msg: MessageCreateArgs) {
  console.log("contact from service: ");
  try {
    return await msgModel.create(msg);
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}
