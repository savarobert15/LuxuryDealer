import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { CarSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) {
    return NextResponse.json({ error: "Mașina nu a fost găsită" }, { status: 404 });
  }
  return NextResponse.json(car);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const validated = CarSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: "Date invalide", details: validated.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const car = await prisma.car.update({
    where: { id },
    data: validated.data,
  });

  return NextResponse.json(car);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.car.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
