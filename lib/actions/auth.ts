"use server";

import { login, logout } from "@/lib/auth";
import { LoginSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function loginAction(_prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = LoginSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Date invalide", details: validated.error.flatten().fieldErrors };
  }

  const user = await login(validated.data.email, validated.data.password);
  if (!user) {
    return { error: "Email sau parolă incorectă" };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
