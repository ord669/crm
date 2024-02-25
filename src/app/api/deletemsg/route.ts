// src/app/api/users/route.ts

import type { ContactCreateArgs, MessageCreateArgs } from "@/globals";

import { msgService } from "@/server/api/services/msg.service";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  message: MessageCreateArgs;
  contact: ContactCreateArgs;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    await msgService.deleteAllMsgs();

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
