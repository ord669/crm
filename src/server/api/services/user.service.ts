// src/server/services/postService.ts

import { userModel } from "../models/user.model";

export const userService = {
  create,
};

async function create(
  id: string,
  firstName: string,
  lastName: string,
  email: string | null,
) {
  return await userModel.create(id, firstName, lastName, email);
}
