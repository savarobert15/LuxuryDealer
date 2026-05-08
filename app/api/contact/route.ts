import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ContactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = ContactSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: "Date invalide", details: validated.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const contact = await prisma.contact.create({ data: validated.data });
  return NextResponse.json(contact, { status: 201 });
}
