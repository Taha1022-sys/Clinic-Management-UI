export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "RECEPTIONIST" | "PATIENT";
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string | null;
  biography?: string | null; // Rich text/Markdown from Strapi
  experience?: number | null; // Years of experience
  price?: number | null; // Consultation fee
  contact_email?: string | null;
  is_active?: boolean;
}
