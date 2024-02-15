// src/app/api/users/route.ts

import { ContactCreateArgs } from "@/globals";
import { contactService } from "@/server/api/services/contact.service";
import { Contact } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    language: string;
    profilePic: string;
    countryCode: string;
    status: string;
    tags: string[];
    assignee: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
    createdAt: number;
  };
  event_type: string;
  event_id: string;
}

interface Payload {
  contact: ContactCreateArgs;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Payload;
    console.log("payload: ", payload);
    const userData = payload.contact; // Extract the user data from the payload

    const contact = await contactService.create(payload.contact);

    // Respond with success and the created user data
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to handle POST request:", error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Failed to handle POST request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
