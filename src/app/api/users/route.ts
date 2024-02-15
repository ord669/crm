// src/app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/server/api/services/user.service";

// Define the interfaces for the parts of the payload you plan to use
interface Verification {
  status: string;
}

interface EmailAddress {
  email_address: string;
  id: string;
  verification: Verification;
}

interface User {
  first_name: string;
  last_name: string;
  email_addresses: EmailAddress[];
  id: string;
  primary_email_address_id: string;
}

interface Payload {
  data: User;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Payload; // Cast the incoming payload to the Payload type
    const userData = payload.data; // Extract the user data from the payload

    // Log the extracted user data for debugging
    console.log("Extracted user data: ", userData);

    // Example usage with userService.create (you might need to adjust this based on your actual userService implementation)
    const user = await userService.create(
      userData.id,
      userData.first_name,
      userData.last_name,
      userData.email_addresses.find(
        (email) => email.id === userData.primary_email_address_id,
      )?.email_address ?? null,
    );

    // Respond with success and the created user data
    return new NextResponse(JSON.stringify({ success: true, user }), {
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
