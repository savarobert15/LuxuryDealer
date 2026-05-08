"use server";

import prisma from "@/lib/prisma";
import { CarSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCar(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  const data = {
    title: formData.get("title") as string,
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    year: Number(formData.get("year")),
    mileage: Number(formData.get("mileage")),
    price: Number(formData.get("price")),
    fuelType: formData.get("fuelType") as string,
    transmission: formData.get("transmission") as string,
    category: formData.get("category") as string,
    description: (formData.get("description") as string) || "",
    images: JSON.parse((formData.get("images") as string) || "[]"),
    featured: formData.get("featured") === "true",
    isNew: formData.get("isNew") === "true",
  };

  const validated = CarSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Date invalide", details: validated.error.flatten().fieldErrors };
  }

  await prisma.car.create({ data: validated.data });
  revalidatePath("/cars");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updateCar(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  const data = {
    title: formData.get("title") as string,
    brand: formData.get("brand") as string,
    model: formData.get("model") as string,
    year: Number(formData.get("year")),
    mileage: Number(formData.get("mileage")),
    price: Number(formData.get("price")),
    fuelType: formData.get("fuelType") as string,
    transmission: formData.get("transmission") as string,
    category: formData.get("category") as string,
    description: (formData.get("description") as string) || "",
    images: JSON.parse((formData.get("images") as string) || "[]"),
    featured: formData.get("featured") === "true",
    isNew: formData.get("isNew") === "true",
  };

  const validated = CarSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Date invalide", details: validated.error.flatten().fieldErrors };
  }

  await prisma.car.update({ where: { id }, data: validated.data });
  revalidatePath("/cars");
  revalidatePath(`/cars/${id}`);
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCar(id: string) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  await prisma.car.delete({ where: { id } });
  revalidatePath("/cars");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
