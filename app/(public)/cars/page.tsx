import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Container from "@/components/ui/Container";
import CarCard from "@/components/CarCard";
import CarsFilter from "@/components/cars/CarsFilter";
import Pagination from "@/components/cars/Pagination";

export const metadata: Metadata = {
  title: "Mașini | Colecția Completă",
  description:
    "Explorează întreaga noastră colecție de automobile premium. Filtrare avansată după brand, preț, an și multe altele.",
};

const ITEMS_PER_PAGE = 9;

interface CarsPageProps {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    fuelType?: string;
    transmission?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Build filter
  const where: Record<string, unknown> = {};

  if (params.brand) where.brand = params.brand;
  if (params.fuelType) where.fuelType = params.fuelType;
  if (params.transmission) where.transmission = params.transmission;
  if (params.category) where.category = params.category;

  if (params.minPrice || params.maxPrice) {
    where.price = {
      ...(params.minPrice ? { gte: Number(params.minPrice) } : {}),
      ...(params.maxPrice ? { lte: Number(params.maxPrice) } : {}),
    };
  }

  if (params.minYear || params.maxYear) {
    where.year = {
      ...(params.minYear ? { gte: Number(params.minYear) } : {}),
      ...(params.maxYear ? { lte: Number(params.maxYear) } : {}),
    };
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { brand: { contains: params.search, mode: "insensitive" } },
      { model: { contains: params.search, mode: "insensitive" } },
    ];
  }

  // Build sort
  let orderBy: Record<string, string> = { createdAt: "desc" };
  switch (params.sort) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "mileage_asc":
      orderBy = { mileage: "asc" };
      break;
    case "year_desc":
      orderBy = { year: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      orderBy,
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.car.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="py-12 bg-[#F8F9FA] min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0A0A0A]">
            Colecția Noastră
          </h1>
          <p className="text-[#1F2937] mt-2 text-lg">
            {total} automobile disponibile
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CarsFilter />
          </aside>

          <div className="lg:col-span-3">
            {cars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination currentPage={page} totalPages={totalPages} />
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold text-[#1F2937]">
                  Nu am găsit mașini
                </p>
                <p className="text-gray-500 mt-2">
                  Încearcă să modifici filtrele de căutare
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
