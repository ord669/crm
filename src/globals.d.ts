export interface ContactCreateArgs {
  id: number;
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  language?: string;
  profilePic?: string;
  countryCode?: string;
  status: string;
  assigneeId?: string | null; // Explicitly allowing null
}

export interface MessageCreateArgs {
  messageId: string | number;
  channelMessageId?: string | number;
  contactId: number;
  channelId: number;
  traffic: string;
  timestamp: number | bigint; // Keeping this as number | bigint
  status: Array<{
    value: string;
    timestamp: number | bigint;
    message?: string;
  }>;
  message: {
    type: string;
    text: string;
    messageTag?: string;
  };
}
