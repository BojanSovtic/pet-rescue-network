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
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  userId: string,
  shelterId: string;
  shelterName: string;
  status: string,
}
