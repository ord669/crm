// src/server/services/postService.ts

import { msgModel } from "../models/msg.model";
import type { MessageCreateArgs } from "@/globals";

export const msgService = {
  create,
  deleteAllMsgs,
  getMessagesByContactId,
};

async function create(msg: MessageCreateArgs) {
  try {
    return await msgModel.create(msg);
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}
async function deleteAllMsgs() {
  try {
    return await msgModel.deleteAllMsgs();
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}

async function getMessagesByContactId(id: number) {
  try {
    return await msgModel.getMessagesByContactId(id);
  } catch (err) {
    console.log("err from contact service function create", err);
    throw err;
  }
}
