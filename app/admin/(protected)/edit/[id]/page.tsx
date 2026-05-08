import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Container from "@/components/ui/Container";
import CarForm from "@/components/admin/CarForm";

export const metadata: Metadata = {
  title: "Editează Mașină",
};

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) notFound();

  return (
    <section className="py-8 bg-[#F8F9FA] min-h-screen">
      <Container className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-8">
          Editează: {car.title}
        </h1>
        <CarForm car={car} />
      </Container>
    </section>
  );
}
