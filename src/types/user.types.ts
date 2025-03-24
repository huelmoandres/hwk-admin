export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  birthDate: Date;
  phoneNumber: string;
  type: "admin" | "user" | string;
  profilePicture: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  slug: string;
  country: Country;
}
