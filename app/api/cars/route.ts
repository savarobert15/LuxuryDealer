import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 12));
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  const brand = searchParams.get("brand");
  const fuelType = searchParams.get("fuelType");
  const transmission = searchParams.get("transmission");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (brand) where.brand = brand;
  if (fuelType) where.fuelType = fuelType;
  if (transmission) where.transmission = transmission;
  if (category) where.category = category;

  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: Number(minPrice) } : {}),
      ...(maxPrice ? { lte: Number(maxPrice) } : {}),
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { brand: { contains: search, mode: "insensitive" } },
      { model: { contains: search, mode: "insensitive" } },
    ];
  }

  const sort = searchParams.get("sort");
  let orderBy: Record<string, string> = { createdAt: "desc" };
  switch (sort) {
    case "price_asc": orderBy = { price: "asc" }; break;
    case "price_desc": orderBy = { price: "desc" }; break;
    case "mileage_asc": orderBy = { mileage: "asc" }; break;
    case "year_desc": orderBy = { year: "desc" }; break;
  }

  const [cars, total] = await Promise.all([
    prisma.car.findMany({ where, orderBy, skip, take: limit }),
    prisma.car.count({ where }),
  ]);

  return NextResponse.json({
    cars,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
