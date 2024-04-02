import { Contact } from "./contact.model";

export interface Shelter {
  id?: string;
  name: string;
  description: string;
  contact: Contact;
  website: string;
  imageURL: string;
}
