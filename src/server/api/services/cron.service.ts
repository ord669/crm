// src/server/services/cronService.ts

import { cronModel } from "../models/cron.model";

export const cronService = {
  getAll,
  getById,
  deleteById,
  create,
};

async function create(
  hours: string,
  minutes: string,
  template: string,
  contactId: string,
) {
  console.log("hours: from service ", hours);
  return await cronModel.create(hours, minutes, template, contactId);
}

async function getAll() {
  return await cronModel.getAll();
}

async function getById(id: number) {
  return await cronModel.getById(id);
}

async function deleteById(id: number) {
  return await cronModel.deleteById(id);
}
