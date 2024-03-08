// src/server/models/templateModel.ts

import axios from "axios";

export const templateModel = {
  getAll,
};

async function getAll() {
  const options = {
    method: "GET",
    url:
      "https://api.respond.io/v2/space/channel/" +
      process.env.RESPOND_WHATSAPP_CHANNEL_0557113696_ID +
      "/template",
    params: { limit: "99" },
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + process.env.RESPONDIO_ACCESS_TOKEN,
    },
  };

  try {
    const { data } = await axios.request(options);

    return data;
  } catch (error) {
    console.error(error);
  }
}
