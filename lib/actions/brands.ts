"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBrand(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  const name = (formData.get("name") as string)?.trim();
  const logo = (formData.get("logo") as string)?.trim() || "";
  const country = (formData.get("country") as string)?.trim() || "";

  if (!name) return { error: "Numele brandului este obligatoriu" };

  try {
    await prisma.brand.create({ data: { name, logo, country } });
    revalidatePath("/admin/brands");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Brand-ul există deja" };
  }
}

export async function updateBrand(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  const name = (formData.get("name") as string)?.trim();
  const logo = (formData.get("logo") as string)?.trim() || "";
  const country = (formData.get("country") as string)?.trim() || "";

  if (!name) return { error: "Numele brandului este obligatoriu" };

  await prisma.brand.update({ where: { id }, data: { name, logo, country } });
  revalidatePath("/admin/brands");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBrand(id: string) {
  const session = await getSession();
  if (!session) return { error: "Neautorizat" };

  await prisma.brand.delete({ where: { id } });
  revalidatePath("/admin/brands");
  revalidatePath("/");
  return { success: true };
}
