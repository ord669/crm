// src/app/api/users/route.ts

import type { ContactCreateArgs, MessageCreateArgs } from "@/globals";
import { contactService } from "@/server/api/services/contact.service";
import { msgService } from "@/server/api/services/msg.service";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  message: MessageCreateArgs;
  contact: ContactCreateArgs;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Payload;
    console.log("payload: ", payload);
    const msgData = payload.message; // Extract the user data from the payload
    console.log("msgData: ", msgData);

    const existingContact = await contactService.checkContactExists(
      msgData.contactId,
    );

    if (!existingContact) {
      // Extract contact information from the payload
      const contactInfo = payload.contact; // Assuming payload structure matches your example

      const newContactData = {
        id: contactInfo.id,
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName ?? "", // Use empty string or null if lastName is not provided
        phone: contactInfo.phone,
        email: contactInfo.email,
        language: contactInfo.language,
        profilePic: contactInfo.profilePic,
        countryCode: contactInfo.countryCode,
        status: contactInfo.status,
      };

      await contactService.create(newContactData);
    }

    const message = await msgService.create(payload.message);

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
