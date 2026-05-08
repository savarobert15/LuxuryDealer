import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Container from "@/components/ui/Container";
import CarGallery from "@/components/cars/CarGallery";
import CarInfo from "@/components/cars/CarInfo";
import SimilarCars from "@/components/cars/SimilarCars";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) return { title: "Mașină negăsită" };

  return {
    title: `${car.title} | ${car.brand}`,
    description: car.description || `${car.title} - ${car.year}, ${car.mileage} km, ${car.fuelType}`,
    openGraph: {
      title: car.title,
      description: car.description || `${car.brand} ${car.model}`,
      images: car.images.length > 0 ? [car.images[0]] : [],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) notFound();

  const similarCars = await prisma.car.findMany({
    where: {
      OR: [
        { brand: car.brand },
        { category: car.category },
      ],
      NOT: { id: car.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-12 bg-[#F8F9FA] min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <CarGallery images={car.images} title={car.title} />
          <CarInfo car={car} />
        </div>

        {car.description && (
          <div className="bg-white rounded-2xl p-8 shadow-md mb-16">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-4">
              Descriere
            </h2>
            <p className="text-[#1F2937] leading-relaxed whitespace-pre-line">
              {car.description}
            </p>
          </div>
        )}

        {similarCars.length > 0 && <SimilarCars cars={similarCars} />}
      </Container>
    </section>
  );
}
