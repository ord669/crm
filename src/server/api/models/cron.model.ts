// src/server/models/cronModel.ts
import axios from "axios";

export const cronModel = {
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
  console.log("template: ", template);
  console.log("minutes: ", minutes);
  console.log("contactId: ", contactId);
  console.log("hours: ", hours);
  const CRON_KEY = process.env.CRON_KEY;
  const ENDPOINT = "https://api.cron-job.org/jobs";

  const now = new Date();
  // Correctly add seconds for more precise scheduling
  now.setSeconds(now.getSeconds() + 120); // Adding 12 seconds to the current time

  const schedule = {
    timezone: "Asia/Jerusalem",
    hours: [now.getHours()],
    mdays: [now.getDate()],
    minutes: [now.getMinutes()],
    months: [now.getMonth() + 1], // Correcting month indexing
    wdays: [-1],
  };

  const payload = {
    job: {
      url: `https://webhook.site/052387a1-1f4f-43dd-84f7-e254f95727ee?template=${template}&contactid=${contactId}`, // Replace with your actual URL
      enabled: true,
      saveResponses: true,
      schedule,
      title: "new3",
    },
  };

  try {
    const response = await axios.put(ENDPOINT, payload, {
      headers: {
        Authorization: `Bearer ${CRON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Cron Job Created:", response.data);
  } catch (error) {
    console.error("Error creating cron job:");
  }
}

// Example usage: createCronJob('10', '30'); // Schedules a job at 10:30

async function getAll() {}

async function getById(id: number) {}

async function deleteById(id: number) {}
