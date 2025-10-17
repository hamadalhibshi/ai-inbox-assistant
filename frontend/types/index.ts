export interface Entity {
  type: string;
  value: string;
}

export interface Contact {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface Ticket {
  id: string | undefined;
  status: string | undefined;
  createdAt: string | undefined;
  contact: Contact;
  channel: string | undefined;
  language: string | undefined;
  intent: string | undefined;
  priority: string | undefined;
  entities: Entity[];
  message_raw: string | undefined;
  reply_suggestion: string | undefined;
}

export interface Filters {
  status: string;
  language: string;
  priority: string;
  search: string;
}
