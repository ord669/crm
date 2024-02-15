export interface ContactCreateArgs {
  id: Int;
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
