"use server";

import prisma from "@/lib/prisma";
import { ContactSchema } from "@/lib/validations";

export async function submitContact(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    carId: (formData.get("carId") as string) || undefined,
  };

  const validated = ContactSchema.safeParse(data);
  if (!validated.success) {
    return {
      error: "Date invalide",
      details: validated.error.flatten().fieldErrors,
    };
  }

  await prisma.contact.create({ data: validated.data });
  return { success: true };
}
