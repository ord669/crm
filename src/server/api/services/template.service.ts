// src/server/services/templateService.ts

import { templateModel } from "../models/template.model";

export const templateService = {
  getAll,
};

async function getAll() {
  return await templateModel.getAll();
}
