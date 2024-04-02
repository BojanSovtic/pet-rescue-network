import { Contact } from "./contact.model";

export interface Pet {
  id?: string,
  name: string,
  description: string,
  species: string,
  breed: string,
  age: string;
  size: string;
  gender: string;
  imageURLs: string[],
  contact: Contact;
  userId: string,
  shelterId: string;
  shelterName: string;
  status: string,
}
