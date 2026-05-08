import { NextRequest, NextResponse } from "next/server";
import { login } from "@/lib/auth";
import { LoginSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = LoginSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: "Date invalide" },
      { status: 400 }
    );
  }

  const user = await login(validated.data.email, validated.data.password);
  if (!user) {
    return NextResponse.json(
      { error: "Email sau parolă incorectă" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
