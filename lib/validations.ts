import { z } from "zod";

export const CarSchema = z.object({
  title: z.string().min(2, "Titlul trebuie să aibă minim 2 caractere"),
  brand: z.string().min(1, "Brandul este obligatoriu"),
  model: z.string().min(1, "Modelul este obligatoriu"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  mileage: z.number().int().min(0),
  price: z.number().int().min(0),
  fuelType: z.string().min(1, "Tipul de combustibil este obligatoriu"),
  transmission: z.string().min(1, "Transmisia este obligatorie"),
  category: z.string().min(1, "Categoria este obligatorie"),
  description: z.string().optional().default(""),
  images: z.array(z.string().url()).min(1, "Cel puțin o imagine este necesară"),
  featured: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(true),
});

export const ContactSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
  email: z.string().email("Email invalid"),
  phone: z.string().min(6, "Telefonul trebuie să aibă minim 6 caractere"),
  subject: z.string().min(2, "Subiectul este obligatoriu"),
  message: z.string().min(10, "Mesajul trebuie să aibă minim 10 caractere"),
  carId: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(6, "Parola trebuie să aibă minim 6 caractere"),
});

export type CarFormData = z.infer<typeof CarSchema>;
export type ContactFormData = z.infer<typeof ContactSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
